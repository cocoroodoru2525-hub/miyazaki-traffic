"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function getColor(jamFactor) {
  if (jamFactor >= 7) return "#ef4444";
  if (jamFactor >= 4) return "#f59e0b";
  return "#22c55e";
}

async function getPlaceName(lat, lng) {
  try {
    const res = await fetch(
      `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lon=${lng}&lat=${lat}`
    );
    const json = await res.json();
    const r = json.results;
    if (r && r.lv01Nm) {
      return r.lv01Nm;
    }
    return `${lat.toFixed(3)}, ${lng.toFixed(3)}`;
  } catch {
    return `${lat.toFixed(3)}, ${lng.toFixed(3)}`;
  }
}

export default function DataPage() {
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [spotRanking, setSpotRanking] = useState([]);
  const [summary, setSummary] = useState({ total: 0, avgJam: 0, maxJam: 0, congestionRate: 0 });

  useEffect(() => {
    async function load() {
      const since = new Date();
      since.setDate(since.getDate() - 30);

      const { data } = await supabase
        .from("traffic_log")
        .select("*")
        .gte("recorded_at", since.toISOString())
        .order("recorded_at", { ascending: true });

      if (!data || data.length === 0) { setLoading(false); return; }

      // サマリー
      const avgJam = data.reduce((s, r) => s + r.jam_factor, 0) / data.length;
      const maxJam = Math.max(...data.map(r => r.jam_factor));
      const congestionRate = (data.filter(r => r.jam_factor >= 7).length / data.length * 100);
      setSummary({ total: data.length, avgJam, maxJam, congestionRate });

      // 日別データ
      const byDay = {};
      for (const row of data) {
        const day = new Date(row.recorded_at).toLocaleDateString("ja-JP", { month: "numeric", day: "numeric" });
        if (!byDay[day]) byDay[day] = { day, count: 0, jamSum: 0, congestion: 0 };
        byDay[day].count++;
        byDay[day].jamSum += row.jam_factor;
        if (row.jam_factor >= 7) byDay[day].congestion++;
      }
      setDailyData(Object.values(byDay).map(d => ({
        day: d.day,
        平均渋滞度: parseFloat((d.jamSum / d.count).toFixed(2)),
        渋滞件数: d.congestion,
      })));

      // 時間帯別データ
      const byHour = {};
      for (let h = 0; h < 24; h++) byHour[h] = { hour: `${h}時`, count: 0, jamSum: 0 };
      for (const row of data) {
        const h = new Date(row.recorded_at).getHours();
        byHour[h].count++;
        byHour[h].jamSum += row.jam_factor;
      }
      setHourlyData(Object.values(byHour).map(d => ({
        hour: d.hour,
        平均渋滞度: d.count > 0 ? parseFloat((d.jamSum / d.count).toFixed(2)) : 0,
      })));

      // スポット別ランキング
      const bySpot = {};
      for (const row of data) {
        const key = `${row.lat.toFixed(3)},${row.lng.toFixed(3)}`;
        if (!bySpot[key]) bySpot[key] = { lat: row.lat, lng: row.lng, count: 0, jamSum: 0 };
        bySpot[key].count++;
        bySpot[key].jamSum += row.jam_factor;
      }
      const sorted = Object.values(bySpot)
        .sort((a, b) => (b.jamSum / b.count) - (a.jamSum / a.count))
        .slice(0, 10);

      setSpotRanking(sorted.map(s => ({ ...s, placeName: `${s.lat.toFixed(3)}, ${s.lng.toFixed(3)}` })));
      setLoading(false);

      // 地名を非同期取得（並列）
      sorted.forEach(async (spot, i) => {
        const name = await getPlaceName(spot.lat, spot.lng);
        setSpotRanking(prev => {
          const next = [...prev];
          if (next[i]) next[i] = { ...next[i], placeName: name };
          return next;
        });
      });
    }
    load();
  }, []);

  const cardStyle = { background: "#fff", borderRadius: 10, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", flex: 1 };

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f8fafc" }}>

      {/* ヘッダー */}
      <div style={{ background: "#1d4ed8", color: "white", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>🚦</span>
        <span style={{ fontWeight: "bold", fontSize: 18 }}>宮崎市 渋滞マップ</span>
      </div>

      {/* ナビゲーション */}
      <div style={{ background: "#1e3a8a", display: "flex" }}>
        <Link href="/" style={{ padding: "10px 20px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13 }}>
          📍 渋滞マップ
        </Link>
        <a href="https://www.google.com/maps/@31.9077,131.4202,13z/data=!5m1!1e1" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13 }}>
          🗺️ Googleマップ
        </a>
        <Link href="/data" style={{ padding: "10px 20px", color: "white", textDecoration: "none", background: "#2563eb", fontWeight: "bold", fontSize: 13, borderBottom: "3px solid white" }}>
          📊 1ヶ月データ
        </Link>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 16px" }}>

        <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
          📅 過去30日間の渋滞データ集計
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#94a3b8", fontSize: 15 }}>
            データ読み込み中...
          </div>
        ) : (
          <>
            {/* スポットランキング */}
            <div style={{ background: "#fff", borderRadius: 10, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
              <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 16, color: "#1e293b" }}>🏆 渋滞多発スポット TOP10（過去30日）</div>
              {spotRanking.map((spot, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < spotRanking.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <span style={{ fontSize: 18, width: 28, textAlign: "center" }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: "bold", color: "#1e293b" }}>{spot.placeName}</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>データ件数: {spot.count}件</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 14, fontWeight: "bold", color: getColor(spot.jamSum / spot.count) }}>
                      {(spot.jamSum / spot.count).toFixed(1)}
                    </div>
                    <div style={{ fontSize: 10, color: "#94a3b8" }}>平均渋滞度</div>
                  </div>
                </div>
              ))}
              {spotRanking.length === 0 && (
                <div style={{ textAlign: "center", color: "#94a3b8", padding: 40, fontSize: 13 }}>データが蓄積されると表示されます</div>
              )}
            </div>

            {/* 時間帯別グラフ */}
            <div style={{ background: "#fff", borderRadius: 10, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
              <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 16, color: "#1e293b" }}>🕐 時間帯別 平均渋滞度</div>
              {hourlyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={hourlyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={1} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="平均渋滞度" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ textAlign: "center", color: "#94a3b8", padding: 40, fontSize: 13 }}>データが蓄積されると表示されます</div>
              )}
            </div>

            {/* 日別グラフ */}
            <div style={{ background: "#fff", borderRadius: 10, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", marginBottom: 20 }}>
              <div style={{ fontWeight: "bold", fontSize: 14, marginBottom: 16, color: "#1e293b" }}>📈 日別 平均渋滞度・渋滞件数</div>
              {dailyData.length > 0 ? (
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={dailyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" domain={[0, 10]} tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="平均渋滞度" stroke="#1d4ed8" strokeWidth={2} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="渋滞件数" stroke="#ef4444" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ textAlign: "center", color: "#94a3b8", padding: 40, fontSize: 13 }}>データが蓄積されると表示されます</div>
              )}
            </div>

            {/* サマリーカード */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <div style={cardStyle}>
                <div style={{ fontSize: 11, color: "#64748b" }}>総データ件数</div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#1d4ed8", marginTop: 4 }}>{summary.total.toLocaleString()}<span style={{ fontSize: 12, fontWeight: "normal" }}> 件</span></div>
              </div>
              <div style={cardStyle}>
                <div style={{ fontSize: 11, color: "#64748b" }}>平均渋滞度</div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: getColor(summary.avgJam), marginTop: 4 }}>{summary.avgJam.toFixed(1)}<span style={{ fontSize: 12, fontWeight: "normal" }}> / 10</span></div>
              </div>
              <div style={cardStyle}>
                <div style={{ fontSize: 11, color: "#64748b" }}>最大渋滞度</div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#ef4444", marginTop: 4 }}>{summary.maxJam.toFixed(1)}<span style={{ fontSize: 12, fontWeight: "normal" }}> / 10</span></div>
              </div>
              <div style={cardStyle}>
                <div style={{ fontSize: 11, color: "#64748b" }}>渋滞発生率</div>
                <div style={{ fontSize: 24, fontWeight: "bold", color: "#f59e0b", marginTop: 4 }}>{summary.congestionRate.toFixed(1)}<span style={{ fontSize: 12, fontWeight: "normal" }}> %</span></div>
              </div>
            </div>
          </>
        )}
        {/* トップへ戻るボタン */}
        <div style={{ textAlign: "center", padding: "24px 0 32px" }}>
          <Link href="/" style={{ display: "inline-block", background: "#1d4ed8", color: "white", padding: "12px 32px", borderRadius: 8, textDecoration: "none", fontWeight: "bold", fontSize: 15, boxShadow: "0 4px 12px rgba(29,78,216,0.3)" }}>
            ⬆️ トップへ戻る
          </Link>
        </div>

      </div>
    </div>
  );
}
