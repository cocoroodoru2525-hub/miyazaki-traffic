const https = require('https');
const { createClient } = require('@supabase/supabase-js');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://asdadmmreyzhelxrares.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_n1Ks6_yXd6p6xL3d8hNM_w_X2RtAymP';
const BSKY_HANDLE = process.env.BSKY_HANDLE;
const BSKY_APP_PASSWORD = process.env.BSKY_APP_PASSWORD;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function httpsRequest(url, options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null, headers: res.headers });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function bskyLogin() {
  const body = JSON.stringify({ identifier: BSKY_HANDLE, password: BSKY_APP_PASSWORD });
  const res = await httpsRequest('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
  }, body);
  console.log('Blueskyログイン成功:', res.data.handle);
  return { accessJwt: res.data.accessJwt, did: res.data.did };
}

async function bskyUploadImage(accessJwt, imagePath) {
  const imageData = fs.readFileSync(imagePath);
  const res = await httpsRequest('https://bsky.social/xrpc/com.atproto.repo.uploadBlob', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessJwt}`,
      'Content-Type': 'image/png',
      'Content-Length': imageData.length,
    },
  }, imageData);
  console.log('画像アップロード成功');
  return res.data.blob;
}

async function bskyPost(accessJwt, did, text, blob) {
  const now = new Date().toISOString();
  const linkStart = text.indexOf('https://noriai.jp');
  const linkEnd = linkStart + 'https://noriai.jp'.length;
  const encoder = new TextEncoder();
  const byteStart = encoder.encode(text.substring(0, linkStart)).length;
  const byteEnd = encoder.encode(text.substring(0, linkEnd)).length;

  const record = {
    $type: 'app.bsky.feed.post',
    text: text,
    createdAt: now,
    facets: [{
      index: { byteStart, byteEnd },
      features: [{ $type: 'app.bsky.richtext.facet#link', uri: 'https://noriai.jp' }],
    }],
    embed: {
      $type: 'app.bsky.embed.images',
      images: [{ alt: '宮崎市渋滞マップ', image: blob, aspectRatio: { width: 1200, height: 900 } }],
    },
  };

  const body = JSON.stringify({ repo: did, collection: 'app.bsky.feed.post', record });
  const res = await httpsRequest('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessJwt}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body),
    },
  }, body);
  console.log('投稿成功:', res.data.uri);
  return res.data;
}

async function captureMap() {
  const screenshotPath = path.join(__dirname, 'traffic-map.png');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900 });
  console.log('noriai.jp にアクセス中...');
  await page.goto('https://noriai.jp', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 5000));
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('スクリーンショット保存:', screenshotPath);
  await browser.close();
  return screenshotPath;
}

async function getTrafficSummary() {
  const { data } = await supabase.from('traffic_log').select('*').order('recorded_at', { ascending: false }).limit(200);
  if (!data || data.length === 0) return { congested: 0, moderate: 0, smooth: 0, total: 0 };
  const latest = {};
  for (const row of data) { const key = `${row.lat.toFixed(3)},${row.lng.toFixed(3)}`; if (!latest[key]) latest[key] = row; }
  const spots = Object.values(latest);
  return {
    congested: spots.filter(s => s.jam_factor >= 7).length,
    moderate: spots.filter(s => s.jam_factor >= 4 && s.jam_factor < 7).length,
    smooth: spots.filter(s => s.jam_factor < 4).length,
    total: spots.length,
  };
}

function buildPostText(summary) {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const hour = jst.getHours();
  const timeLabel = hour < 12 ? '朝' : '夕方';
  const dateStr = `${jst.getMonth() + 1}/${jst.getDate()}`;
  const timeStr = `${hour}:00`;
  let status = '';
  if (summary.congested >= 5) status = '渋滞多発中！迂回をおすすめします';
  else if (summary.congested >= 1) status = '一部で渋滞が発生しています';
  else if (summary.moderate >= 3) status = 'やや混雑している箇所があります';
  else status = '全体的にスムーズです';
  return [
    `宮崎市 ${timeLabel}の交通情報（${dateStr} ${timeStr}）`,
    '',
    status,
    `渋滞: ${summary.congested}箇所`,
    `やや混雑: ${summary.moderate}箇所`,
    `スムーズ: ${summary.smooth}箇所`,
    '',
    'リアルタイムマップはこちら',
    'https://noriai.jp',
  ].join('\n');
}

async function main() {
  if (!BSKY_HANDLE || !BSKY_APP_PASSWORD) {
    console.error('エラー: Bluesky の認証情報が設定されていません');
    console.error('GitHub Secrets に以下を設定してください:');
    console.error('  BSKY_HANDLE, BSKY_APP_PASSWORD');
    process.exit(1);
  }
  try {
    const summary = await getTrafficSummary();
    console.log('サマリー:', summary);
    const imagePath = await captureMap();
    const { accessJwt, did } = await bskyLogin();
    const blob = await bskyUploadImage(accessJwt, imagePath);
    const postText = buildPostText(summary);
    console.log('投稿内容:\n' + postText);
    await bskyPost(accessJwt, did, postText, blob);
    fs.unlinkSync(imagePath);
    console.log('完了！');
  } catch (err) {
    console.error('エラー:', err.message);
    process.exit(1);
  }
}

main();
