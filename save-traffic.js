const https = require('https');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://asdadmmreyzhelxrares.supabase.co';
const SUPABASE_KEY = 'sb_publishable_n1Ks6_yXd6p6xL3d8hNM_w_X2RtAymP';
const HERE_API_KEY = 'UUfXzPOIY_-azutfptja_MfWiS9NB_MP9bPgEeMU1cI';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchAndSave() {
  const url = `https://data.traffic.hereapi.com/v7/flow?in=bbox:131.3,31.8,131.6,32.0&locationReferencing=shape&apiKey=${HERE_API_KEY}`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', async () => {
      console.log('受信データ:', data.substring(0, 300));
      const json = JSON.parse(data);
      console.log('件数:', json.results ? json.results.length : 0);
      const results = json.results || [];
      for (const r of results) {
        const flow = r.currentFlow;
        const point = r.location.shape.links[0].points[0];
        await supabase.from('traffic_log').insert({
          jam_factor: flow.jamFactor,
          speed: flow.speed,
          free_flow_speed: flow.freeFlow,
          lat: point.lat,
          lng: point.lng
        });
      }
      console.log(`${results.length}件のデータを保存しました！`);
    });
  });
}

fetchAndSave();