"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function getColor(jamFactor) {
  if (jamFactor >= 7) return "#ef4444";
  if (jamFactor >= 4) return "#f59e0b";
  return "#22c55e";
}

function getLevelLabel(jamFactor) {
  if (jamFactor >= 7) return "🔴 渋滞";
  if (jamFactor >= 4) return "🟡 やや混雑";
  return "🟢 スムーズ";
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

export default function Home() {
  const mapRef = useRef(null);
  const [updated, setUpdated] = useState("");
  const [ranking, setRanking] = useState([]);
  const [recentList, setRecentList] = useState([]);
  const [tab, setTab] = useState("ranking");

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("leaflet").then((L) => {
      if (mapRef.current._leaflet_id) return;
      const map = L.map(mapRef.current).setView([31.9077, 131.4202], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      async function loadTraffic() {
        const { data } = await supabase
          .from("traffic_log")
          .select("*")
          .order("recorded_at", { ascending: false })
          .limit(200);

        if (!data) return;

        // 最新スポットごとに1件
        const latest = {};
        for (const row of data) {
          const key = `${row.lat.toFixed(3)},${row.lng.toFixed(3)}`;
          if (!latest[key]) latest[key] = row;
        }

        const spots = Object.values(latest);

        // 地図ピン
        for (const row of spots) {
          const color = getColor(row.jam_factor);
          L.circleMarker([row.lat, row.lng], {
            radius: 10,
            color: color,
            fillColor: color,
            fillOpacity: 0.8,
          })
            .addTo(map)
            .bindPopup(
              "渋滞度: " + row.jam_factor.toFixed(1) + "<br>速度: " + row.speed.toFixed(1) + " km/h"
            );
        }

        // ランキング（jam_factor降順TOP10）＋地名取得
        const sorted = [...spots].sort((a, b) => b.jam_factor - a.jam_factor).slice(0, 10);
        setRanking(sorted); // まず座標で表示
        // 地名を非同期で取得して順次更新
        sorted.forEach(async (row, i) => {
          const name = await getPlaceName(row.lat, row.lng);
          setRanking(prev => {
            const next = [...prev];
            if (next[i]) next[i] = { ...next[i], placeName: name };
            return next;
          });
        });

        // 最新一覧（recorded_at降順）＋地名取得
        const recent = [...data].slice(0, 20);
        setRecentList(recent.map(r => ({ ...r, placeName: `${r.lat.toFixed(3)}, ${r.lng.toFixed(3)}` })));

        // 地名を非同期で取得して順次更新
        recent.forEach(async (row, i) => {
          const name = await getPlaceName(row.lat, row.lng);
          setRecentList(prev => {
            const next = [...prev];
            if (next[i]) next[i] = { ...next[i], placeName: name };
            return next;
          });
        });

        setUpdated(new Date().toLocaleTimeString("ja-JP"));
      }

      loadTraffic();
    });
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", height: "100vh" }}>

      {/* ヘッダー */}
      <div style={{ background: "#1d4ed8", color: "white", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 20 }}>🚦</span>
        <span style={{ fontWeight: "bold", fontSize: 18 }}>宮崎市 渋滞マップ</span>
        {updated && <span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.8 }}>更新: {updated}</span>}
      </div>

      {/* ナビゲーション */}
      <div style={{ background: "#1e3a8a", display: "flex", gap: 0, flexShrink: 0 }}>
        <Link href="/" style={{ padding: "10px 20px", color: "white", textDecoration: "none", background: "#2563eb", fontWeight: "bold", fontSize: 13, borderBottom: "3px solid white" }}>
          📍 渋滞マップ
        </Link>
        <a href="https://www.google.com/maps/@31.9077,131.4202,13z/data=!5m1!1e1" target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13 }}>
          🗺️ Googleマップ
        </a>
        <Link href="/data" style={{ padding: "10px 20px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13 }}>
          📊 1ヶ月データ
        </Link>
      </div>

      {/* 凡例 */}
      <div style={{ display: "flex", gap: 16, padding: "8px 16px", background: "#f1f5f9", fontSize: 13, flexShrink: 0 }}>
        <span>🟢 スムーズ</span>
        <span>🟡 やや混雑</span>
        <span>🔴 渋滞</span>
      </div>

      {/* メインコンテンツ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* 地図 */}
        <div style={{ flex: 1, position: "relative" }}>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
          <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
        </div>

        {/* サイドパネル */}
        <div style={{ width: 300, background: "#fff", borderLeft: "1px solid #e2e8f0", display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>

          {/* タブ */}
          <div style={{ display: "flex", borderBottom: "1px solid #e2e8f0", flexShrink: 0 }}>
            <button
              onClick={() => setTab("ranking")}
              style={{ flex: 1, padding: "10px 0", fontSize: 13, fontWeight: tab === "ranking" ? "bold" : "normal", background: tab === "ranking" ? "#eff6ff" : "#fff", border: "none", borderBottom: tab === "ranking" ? "2px solid #1d4ed8" : "none", cursor: "pointer", color: tab === "ranking" ? "#1d4ed8" : "#64748b" }}
            >
              🏆 渋滞ランキング
            </button>
            <button
              onClick={() => setTab("list")}
              style={{ flex: 1, padding: "10px 0", fontSize: 13, fontWeight: tab === "list" ? "bold" : "normal", background: tab === "list" ? "#eff6ff" : "#fff", border: "none", borderBottom: tab === "list" ? "2px solid #1d4ed8" : "none", cursor: "pointer", color: tab === "list" ? "#1d4ed8" : "#64748b" }}
            >
              📋 最新データ
            </button>
          </div>

          {/* タブコンテンツ */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {tab === "ranking" && (
              <div>
                <div style={{ padding: "10px 16px", background: "#eff6ff", fontSize: 11, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                  渋滞度が高い場所TOP10
                </div>
                {ranking.map((row, i) => (
                  <div key={i} style={{ padding: "10px 16px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, fontWeight: "bold", color: i < 3 ? "#f59e0b" : "#94a3b8", width: 24, textAlign: "center" }}>
                      {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: "bold", color: "#1e293b" }}>
                        {row.placeName || `${row.lat.toFixed(3)}, ${row.lng.toFixed(3)}`}
                      </div>
                      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>
                        速度: {row.speed.toFixed(1)} km/h
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 13, fontWeight: "bold", color: getColor(row.jam_factor) }}>
                        {row.jam_factor.toFixed(1)}
                      </div>
                      <div style={{ fontSize: 10, color: "#94a3b8" }}>渋滞度</div>
                    </div>
                  </div>
                ))}
                {ranking.length === 0 && (
                  <div style={{ padding: 20, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>データ読み込み中...</div>
                )}
              </div>
            )}

            {tab === "list" && (
              <div>
                <div style={{ padding: "10px 16px", background: "#eff6ff", fontSize: 11, color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                  最新20件
                </div>
                {recentList.map((row, i) => (
                  <div key={i} style={{ padding: "10px 16px", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: "bold", color: getColor(row.jam_factor) }}>
                        {getLevelLabel(row.jam_factor)}
                      </span>
                      <span style={{ fontSize: 10, color: "#94a3b8" }}>
                        {new Date(row.recorded_at).toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 3 }}>
                      渋滞度: {row.jam_factor.toFixed(1)} ／ 速度: {row.speed.toFixed(1)} km/h
                    </div>
                    <div style={{ fontSize: 11, fontWeight: "bold", color: "#1e293b", marginTop: 2 }}>
                      📍 {row.placeName || `${row.lat.toFixed(4)}, ${row.lng.toFixed(4)}`}
                    </div>
                  </div>
                ))}
                {recentList.length === 0 && (
                  <div style={{ padding: 20, textAlign: "center", color: "#94a3b8", fontSize: 13 }}>データ読み込み中...</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
