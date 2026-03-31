const https = require('https');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://asdadmmreyzhelxrares.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_n1Ks6_yXd6p6xL3d8hNM_w_X2RtAymP';
const X_API_KEY = process.env.X_API_KEY;
const X_API_SECRET = process.env.X_API_SECRET;
const X_ACCESS_TOKEN = process.env.X_ACCESS_TOKEN;
const X_ACCESS_TOKEN_SECRET = process.env.X_ACCESS_TOKEN_SECRET;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21').replace(/\*/g, '%2A')
    .replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
}

function generateOAuthSignature(method, url, params, consumerSecret, tokenSecret) {
  const sortedKeys = Object.keys(params).sort();
  const paramString = sortedKeys.map(k => `${percentEncode(k)}=${percentEncode(params[k])}`).join('&');
  const baseString = `${method}&${percentEncode(url)}&${percentEncode(paramString)}`;
  const signingKey = `${percentEncode(consumerSecret)}&${percentEncode(tokenSecret)}`;
  return crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');
}

function generateOAuthHeader(method, url, extraParams = {}) {
  const oauthParams = {
    oauth_consumer_key: X_API_KEY,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: X_ACCESS_TOKEN,
    oauth_version: '1.0',
    ...extraParams,
  };
  const allParams = { ...oauthParams };
  const signature = generateOAuthSignature(method, url, allParams, X_API_SECRET, X_ACCESS_TOKEN_SECRET);
  oauthParams.oauth_signature = signature;
  const headerParts = Object.keys(oauthParams).sort()
    .map(k => `${percentEncode(k)}="${percentEncode(oauthParams[k])}"`).join(', ');
  return `OAuth ${headerParts}`;
}

async function uploadMedia(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  const base64Data = imageData.toString('base64');
  const url = 'https://upload.twitter.com/1.1/media/upload.json';
  const boundary = `----FormBoundary${crypto.randomBytes(8).toString('hex')}`;
  const body = [`--${boundary}`, 'Content-Disposition: form-data; name="media_data"', '', base64Data, `--${boundary}--`].join('\r\n');
  const authHeader = generateOAuthHeader('POST', url);
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'POST', headers: { 'Authorization': authHeader, 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': Buffer.byteLength(body) } }, (res) => {
      let data = ''; res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) { const json = JSON.parse(data); console.log('画像アップロード成功:', json.media_id_string); resolve(json.media_id_string); }
        else { reject(new Error(`画像アップロード失敗: ${res.statusCode} ${data}`)); }
      });
    }); req.on('error', reject); req.write(body); req.end();
  });
}

async function postTweet(text, mediaId) {
  const url = 'https://api.twitter.com/2/tweets';
  const payload = { text };
  if (mediaId) payload.media = { media_ids: [mediaId] };
  const body = JSON.stringify(payload);
  const authHeader = generateOAuthHeader('POST', url);
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'POST', headers: { 'Authorization': authHeader, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } }, (res) => {
      let data = ''; res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) { const json = JSON.parse(data); console.log('ツイート投稿成功:', json.data.id); resolve(json.data); }
        else { reject(new Error(`ツイート投稿失敗: ${res.statusCode} ${data}`)); }
      });
    }); req.on('error', reject); req.write(body); req.end();
  });
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

function buildTweetText(summary) {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const hour = jst.getHours();
  const timeLabel = hour < 12 ? '朝' : '夕方';
  const dateStr = `${jst.getMonth() + 1}/${jst.getDate()}`;
  const timeStr = `${hour}:00`;
  let status = '';
  if (summary.congested >= 5) status = '⚠️ 渋滞多発中！迂回をおすすめします';
  else if (summary.congested >= 1) status = '🚗 一部で渋滞が発生しています';
  else if (summary.moderate >= 3) status = '🚙 やや混雑している箇所があります';
  else status = '✅ 全体的にスムーズです';
  return [
    `🚦 宮崎市 ${timeLabel}の交通情報（${dateStr} ${timeStr}）`, '',
    status,
    `🔴 渋滞: ${summary.congested}箇所`,
    `🟡 やや混雑: ${summary.moderate}箇所`,
    `🟢 スムーズ: ${summary.smooth}箇所`,
    '', '📍 リアルタイムマップはこちら', 'https://noriai.jp', '',
    '#宮崎市 #渋滞情報 #交通情報 #のりあい',
  ].join('\n');
}

async function main() {
  if (!X_API_KEY || !X_API_SECRET || !X_ACCESS_TOKEN || !X_ACCESS_TOKEN_SECRET) {
    console.error('エラー: X API の認証情報が設定されていません');
    console.error('GitHub Secrets に以下を設定してください:');
    console.error('  X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET');
    process.exit(1);
  }
  try {
    const summary = await getTrafficSummary();
    console.log('サマリー:', summary);
    const imagePath = await captureMap();
    const mediaId = await uploadMedia(imagePath);
    const tweetText = buildTweetText(summary);
    console.log('ツイート内容:\n' + tweetText);
    await postTweet(tweetText, mediaId);
    fs.unlinkSync(imagePath);
    console.log('完了！');
  } catch (err) {
    console.error('エラー:', err.message);
    process.exit(1);
  }
}

main();
