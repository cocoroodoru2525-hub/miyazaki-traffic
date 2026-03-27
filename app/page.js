
"use client";

import { useState, useEffect, useRef } from "react";

const SPOTS = [
  // 中心部
  { id: "s01", name: "青葉町",               area: "中心部",     lat: 31.920290, lng: 131.435871 },
  { id: "s02", name: "橘通り",               area: "中心部",     lat: 31.9166,   lng: 131.4233   },
  { id: "s04", name: "宮崎駅前",             area: "中心部",     lat: 31.9157,   lng: 131.4320   },
  { id: "s05", name: "橘橋",                 area: "中心部",     lat: 31.905563, lng: 131.420283 },
  { id: "s07", name: "イオン宮崎方面",       area: "中心部",     lat: 31.9231,   lng: 131.4552   },
  { id: "s20", name: "源藤",                 area: "中心部",     lat: 31.8874,   lng: 131.4121   },
  { id: "s21", name: "江平",                 area: "中心部",     lat: 31.924248, lng: 131.425176 },
  { id: "s22", name: "大工町",               area: "中心部",     lat: 31.918998, lng: 131.411550 },
  { id: "s23", name: "宮崎県立病院方面",     area: "中心部",     lat: 31.916853, lng: 131.416846 },
  { id: "s24", name: "瀬頭",                 area: "中心部",     lat: 31.907963, lng: 131.428663 },
  { id: "s25", name: "昭和町",               area: "中心部",     lat: 31.907747, lng: 131.436247 },
  { id: "s26", name: "一の宮",               area: "中心部",     lat: 31.907483, lng: 131.446893 },
  // 橋
  { id: "b01", name: "平和台大橋",           area: "中心部",     lat: 31.938097, lng: 131.407573 },
  { id: "b02", name: "宮崎大橋",             area: "中心部",     lat: 31.920532, lng: 131.403445 },
  { id: "b03", name: "高松橋",               area: "中心部",     lat: 31.914820, lng: 131.403551 },
  { id: "b04", name: "天満橋",               area: "中心部",     lat: 31.907564, lng: 131.410734 },
  { id: "b05", name: "大淀大橋",             area: "中心部",     lat: 31.903278, lng: 131.426922 },
  { id: "b06", name: "小戸の橋",             area: "中心部",     lat: 31.900820, lng: 131.434001 },
  { id: "b07", name: "赤江大橋",             area: "南部",       lat: 31.897992, lng: 131.438385 },
  // 北部・住吉
  { id: "s11", name: "日向住吉駅",           area: "北部・住吉", lat: 31.9909,   lng: 131.4565   },
  { id: "s12", name: "宮崎北バイパス方面",   area: "北部・住吉", lat: 31.9580,   lng: 131.4200   },
  { id: "s13", name: "下北方",               area: "北部・住吉", lat: 31.942731, lng: 131.429560 },
  { id: "s27", name: "新名爪",               area: "北部・住吉", lat: 31.974046, lng: 131.439969 },
  { id: "s28", name: "大島",                 area: "北部・住吉", lat: 31.942382, lng: 131.440915 },
  { id: "s29", name: "池内南",               area: "北部・住吉", lat: 31.962470, lng: 131.415004 },
  { id: "s30", name: "平和台大橋東",         area: "北部・住吉", lat: 31.938641, lng: 131.412954 },
  { id: "s31", name: "矢ノ崎",               area: "北部・住吉", lat: 31.940705, lng: 131.421334 },
  { id: "s32", name: "フェニックスガーデン方面", area: "北部・住吉", lat: 31.926719, lng: 131.436580 },
  { id: "s33", name: "大塚（西の原）",       area: "北部・住吉", lat: 31.921930, lng: 131.393986 },
  // 南部
  { id: "s06", name: "宮崎南バイパス",       area: "南部",       lat: 31.8811,   lng: 131.4098   },
  { id: "s14", name: "生目台",               area: "南部",       lat: 31.9038,   lng: 131.3799   },
  { id: "s16", name: "一ツ葉有料道路",       area: "南部",       lat: 31.896225, lng: 131.445172 },
  { id: "s34", name: "大坪町",               area: "南部",       lat: 31.895775, lng: 131.406799 },
  { id: "s35", name: "田吉",                 area: "南部",       lat: 31.881564, lng: 131.427428 },
  { id: "s36", name: "加納",                 area: "南部",       lat: 31.870612, lng: 131.392991 },
  { id: "s18", name: "宮崎IC",               area: "南部",       lat: 31.8700,   lng: 131.4167   },
  // 清武方面
  { id: "s37", name: "ベアーズモール清武方面", area: "南部",     lat: 31.861801, lng: 131.387277 },
  { id: "s38", name: "宮崎医大方面",         area: "南部",       lat: 31.840300, lng: 131.398410 },
  // その他
  { id: "s19", name: "その他",               area: "その他",     lat: 31.9400,   lng: 131.4800   },
];

const AREA_COLORS = {
  "中心部":    "#1d6fb8",
  "南部":      "#d97706",
  "北部・住吉":"#2563eb",
  "郊外":      "#6b7280",
  "その他":    "#9ca3af",
};

const LEVELS = [
  { value: 1, emoji: "🟡", label: "少し混んでいる",   color: "#b45309", bg: "#fef3c7", border: "#fcd34d", shadow: "rgba(180,83,9,0.2)" },
  { value: 2, emoji: "🟠", label: "かなり混んでいる", color: "#c2410c", bg: "#ffedd5", border: "#fb923c", shadow: "rgba(194,65,12,0.25)" },
  { value: 3, emoji: "🔴", label: "ひどい渋滞",       color: "#b91c1c", bg: "#fee2e2", border: "#f87171", shadow: "rgba(185,28,28,0.25)" },
];

// 閲覧側フィルター（時間）
const FILTER_OPTIONS = [
  { value: 1,    label: "1時間以内" },
  { value: 3,    label: "3時間以内" },
  { value: 6,    label: "6時間以内" },
  { value: 24,   label: "24時間以内" },
  { value: 9999, label: "すべて" },
];

const n = Date.now();
const SAMPLE_REPORTS = [
  { id: 1, spotId: "s01", name: "青葉町",       level: 3, postedAt: n - 6*60000,     votes: 9 },
  { id: 2, spotId: "s07", name: "イオン宮崎方面", level: 2, postedAt: n - 20*60000,   votes: 5 },
  { id: 3, spotId: "s11", name: "日向住吉駅",   level: 2, postedAt: n - 95*60000,    votes: 3 },
  { id: 4, spotId: "s12", name: "宮崎北バイパス方面", level: 1, postedAt: n - 4.5*3600000, votes: 2 },
  { id: 5, spotId: "s06", name: "宮崎南バイパス", level: 1, postedAt: n - 8*3600000,  votes: 1 },
];

function timeAgo(postedAt) {
  const mins = Math.round((Date.now() - postedAt) / 60000);
  if (mins < 1)  return "たった今";
  if (mins < 60) return `${mins}分前`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)  return `${hrs}時間前`;
  return `${Math.floor(hrs/24)}日前`;
}

// ── Leaflet 地図 ─────────────────────────────────────
function LeafletMap({ reports, onSelectSpot }) {
  const mapRef  = useRef(null);
  const mapObj  = useRef(null);

  useEffect(() => {
    if (!document.getElementById("leaflet-css")) {
      const css = document.createElement("link");
      css.id = "leaflet-css"; css.rel = "stylesheet";
      css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(css);
    }
    const load = () => { if (window.L) { init(); return; }
      const s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      s.onload = init; document.head.appendChild(s);
    };
    const init = () => {
      if (mapObj.current || !mapRef.current) return;
      const L = window.L;
      const map = L.map(mapRef.current, { zoomControl: true })
        .setView([31.910, 131.420], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors", maxZoom: 18,
      }).addTo(map);
      mapObj.current = map;

      const repMap = {};
      reports.forEach(r => { repMap[r.spotId] = r; });

      SPOTS.forEach(sp => {
        const rep   = repMap[sp.id];
        const lvl   = rep ? LEVELS.find(l => l.value === rep.level) : null;
        const color = lvl ? lvl.color : "#3b82f6";
        const size  = rep ? 22 : 16;
        const icon  = L.divIcon({
          className: "",
          html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:900;cursor:pointer;">${rep?(lvl?.value===3?"!!":lvl?.value===2?"!":"△"):""}</div>`,
          iconSize: [size, size], iconAnchor: [size/2, size/2],
        });
        const lvlHtml = lvl
          ? `<div style="color:${lvl.color};font-weight:800;font-size:13px;margin-bottom:2px">${lvl.emoji} ${lvl.label}</div><div style="color:#9ca3af;font-size:12px;margin-bottom:6px">${timeAgo(rep.postedAt)}</div>`
          : `<div style="color:#9ca3af;font-size:13px;margin-bottom:6px">報告なし</div>`;
        const popup = L.popup({ maxWidth: 200 }).setContent(`
          <div style="font-family:'Noto Sans JP',sans-serif;padding:2px">
            <div style="font-size:11px;font-weight:700;color:${AREA_COLORS[sp.area]};margin-bottom:3px">${sp.area}</div>
            <div style="font-size:16px;font-weight:900;color:#111;margin-bottom:6px">${sp.name}</div>
            ${lvlHtml}
            <button onclick="window.__leafletSelect('${sp.id}')" style="width:100%;padding:8px;background:${color};color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:900;cursor:pointer;font-family:'Noto Sans JP',sans-serif;">ここを選ぶ ✓</button>
          </div>`);
        L.marker([sp.lat, sp.lng], { icon }).addTo(map).bindPopup(popup);
      });

      window.__leafletSelect = (spotId) => {
        const sp = SPOTS.find(s => s.id === spotId);
        if (sp) { onSelectSpot(sp); map.closePopup(); }
      };
    };
    load();
    return () => { if (mapObj.current) { mapObj.current.remove(); mapObj.current = null; } delete window.__leafletSelect; };
  }, []); // eslint-disable-line

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

// ── メインアプリ ─────────────────────────────────────
export default function App() {
  const [screen,    setScreen]    = useState("home");
  const [spot,      setSpot]      = useState(null);
  const [level,     setLevel]     = useState(null);
  const [otherMemo, setOtherMemo] = useState(""); // 「その他」のメモ
  const [reports,   setReports]   = useState(SAMPLE_REPORTS);
  const [voted,     setVoted]     = useState([]);
  const [filter,    setFilter]    = useState(3);
  const [adminPass, setAdminPass] = useState("");
  const [adminOk,   setAdminOk]   = useState(false);

  function startReport() { setSpot(null); setLevel(null); setOtherMemo(""); setScreen("map"); }
  function submit() {
    setReports(p => [{
      id: Date.now(), spotId: spot.id, name: spot.name, level,
      memo: spot.id === "s19" ? otherMemo : "",
      postedAt: Date.now(), votes: 0
    }, ...p]);
    setScreen("done");
  }
  function vote(id) {
    if (voted.includes(id)) return;
    setVoted(p => [...p, id]);
    setReports(p => p.map(r => r.id === id ? { ...r, votes: r.votes+1 } : r));
  }
  function addSpot(name, area, lat, lng) {
    const newId = "u" + Date.now();
    SPOTS.push({ id: newId, name, area, lat: parseFloat(lat), lng: parseFloat(lng) });
    AREA_COLORS[area] = AREA_COLORS[area] || "#6b7280";
  }

  const filteredReports = reports
    .filter(r => filter === 9999 || (Date.now() - r.postedAt) <= filter * 3600000)
    .sort((a, b) => b.postedAt - a.postedAt);

  // 「その他」報告の集計（メモ付き）
  const otherReports = reports.filter(r => r.spotId === "s19" && r.memo);
  const memoCount = otherReports.reduce((acc, r) => {
    const key = r.memo.trim();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // ── HOME ──────────────────────────────────────
  if (screen === "home") return (
    <Shell>
      <div style={{ textAlign: "center", paddingTop: 24 }}>
        <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 10 }}>🚦</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#111827", lineHeight: 1.35, marginBottom: 8 }}>宮崎市<br/>渋滞マップ</h1>
        <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, marginBottom: 36 }}>地図からスポットを選んで<br/>渋滞をみんなに知らせましょう</p>
        <Btn color="#dc2626" sh="rgba(220,38,38,0.35)" onClick={startReport}>🗺️　地図から渋滞を報告する</Btn>
        <div style={{ height: 12 }} />
        <Btn color="#1d4ed8" sh="rgba(29,78,216,0.3)" onClick={() => setScreen("list")}>📋　今の渋滞情報を見る</Btn>
        <div style={{ height: 12 }} />
        {/* Google Maps リアルタイム渋滞リンク */}
        <a
          href="https://www.google.com/maps/@31.910,131.420,13z/data=!5m1!1e1"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", display: "block" }}
        >
          <div style={{
            padding: "18px 16px",
            background: "#fff",
            border: "2px solid #e5e7eb",
            borderRadius: 18,
            fontSize: 18, fontWeight: 900,
            color: "#1a1a2e",
            textAlign: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <span style={{ fontSize: 24 }}>🗾</span>
            <span>Googleマップで渋滞を確認</span>
            <span style={{ fontSize: 13, color: "#9ca3af", marginLeft: 2 }}>↗</span>
          </div>
        </a>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 6, textAlign: "center" }}>
          リアルタイム渋滞レイヤー表示（無料・アプリで開きます）
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20 }}>
          {LEVELS.map(l => (
            <div key={l.value} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{l.emoji}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: l.color }}>
                {reports.filter(r => r.level===l.value && (Date.now()-r.postedAt)<=3*3600000).length}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{l.value===1?"少し":l.value===2?"混雑":"ひどい"}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>※ 直近3時間の件数</p>
        {/* 管理画面リンク（小さめ・目立たない） */}
        <button onClick={() => setScreen("admin")} style={{ marginTop:24, background:"none", border:"1px solid #e5e7eb", borderRadius:10, padding:"6px 16px", fontSize:12, color:"#9ca3af", cursor:"pointer", fontFamily:"inherit" }}>
          🔧 管理画面
        </button>
      </div>
    </Shell>
  );

  // ── MAP ───────────────────────────────────────
  if (screen === "map") return (
    <div style={{ fontFamily:"'Noto Sans JP',sans-serif", height:"100vh", display:"flex", flexDirection:"column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap'); *{box-sizing:border-box;margin:0;padding:0} .leaflet-popup-content-wrapper{border-radius:14px!important} .leaflet-popup-content{margin:10px 12px!important}`}</style>
      <div style={{ background:"#1d6fb8", padding:"12px 16px", display:"flex", alignItems:"center", gap:10, flexShrink:0, zIndex:1000 }}>
        <button onClick={() => setScreen("home")} style={{ background:"rgba(255,255,255,0.22)", border:"none", borderRadius:8, padding:"7px 14px", color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>← 戻る</button>
        <span style={{ fontSize:16, fontWeight:900, color:"#fff" }}>📍 ピンをタップして選択</span>
      </div>
      <div style={{ flex:1, position:"relative" }}>
        <LeafletMap reports={reports} onSelectSpot={setSpot} />
        {/* その他ボタン（海側・右端に固定） */}
        <div style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", zIndex:1000 }}>
          <button
            onClick={() => setSpot(SPOTS.find(s => s.id === "s19"))}
            style={{
              background:"#1d6fb8", color:"#fff", border:"none", borderRadius:12,
              padding:"12px 8px", fontSize:13, fontWeight:900, cursor:"pointer",
              fontFamily:"inherit", writingMode:"vertical-rl",
              boxShadow:"0 3px 12px rgba(29,111,184,0.45)", lineHeight:1.4,
            }}
          >
            その他
          </button>
        </div>
      </div>
      <div style={{ background:"#fff", borderTop:"2px solid #e5e7eb", padding:"16px 18px", flexShrink:0, zIndex:1000 }}>
        {!spot ? (
          <div style={{ textAlign:"center" }}>
            <p style={{ fontSize:16, fontWeight:700, color:"#6b7280", marginBottom:4 }}>地図上のピンをタップして場所を選択</p>
            <p style={{ fontSize:13, color:"#9ca3af" }}>宮崎市内の主要渋滞スポットが表示されています</p>
          </div>
        ) : (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <span style={{ fontSize:20 }}>📍</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:11, color:AREA_COLORS[spot.area], fontWeight:700 }}>{spot.area}</p>
                <p style={{ fontSize:20, fontWeight:900, color:"#111827" }}>{spot.name}</p>
              </div>
              <button onClick={() => setSpot(null)} style={{ background:"none", border:"none", fontSize:22, color:"#9ca3af", cursor:"pointer" }}>✕</button>
            </div>
            <Btn color="#1d6fb8" sh="rgba(29,111,184,0.35)" onClick={() => setScreen("level")}>次へ　→</Btn>
          </div>
        )}
      </div>
    </div>
  );

  // ── LEVEL ─────────────────────────────────────
  if (screen === "level") return (
    <Shell>
      <Back onClick={() => setScreen("map")} />
      <Prog step={2} />
      <div style={{ background:"#f8fafc", border:"2px solid #e2e8f0", borderRadius:14, padding:"12px 16px", marginBottom:24, display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:20 }}>📍</span>
        <span style={{ fontSize:19, fontWeight:900, color:"#111827" }}>{spot?.name}</span>
      </div>
      <Q>どのくらい混んでいますか？</Q>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {LEVELS.map(l => { const on=level===l.value; return (
          <button key={l.value} onClick={() => setLevel(l.value)} style={{ padding:"20px 22px", borderRadius:20, border:`3px solid ${on?l.border:"#e5e7eb"}`, background:on?l.bg:"#fff", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:18, boxShadow:on?`0 6px 20px ${l.shadow}`:"0 1px 4px rgba(0,0,0,0.06)", transition:"all 0.15s" }}>
            <span style={{ fontSize:50 }}>{l.emoji}</span>
            <span style={{ fontSize:21, fontWeight:900, color:on?l.color:"#111827" }}>{l.label}</span>
            {on && <span style={{ marginLeft:"auto", fontSize:28 }}>✅</span>}
          </button>
        );})}
      </div>
      {level && (
        <div style={{ marginTop:24, background:"#f8fafc", border:"2px solid #e2e8f0", borderRadius:16, padding:"16px 20px" }}>
          <p style={{ fontSize:13, color:"#9ca3af", marginBottom:10 }}>報告内容の確認</p>
          <p style={{ fontSize:20, fontWeight:900, color:"#111827", marginBottom:6 }}>📍 {spot?.name}</p>
          <p style={{ fontSize:19, fontWeight:800, color:LEVELS.find(l2=>l2.value===level)?.color }}>
            {LEVELS.find(l2=>l2.value===level)?.emoji}　{LEVELS.find(l2=>l2.value===level)?.label}
          </p>
        </div>
      )}
      {/* 「その他」のときだけメモ欄を表示 */}
      {spot?.id === "s19" && (
        <div style={{ marginTop:16 }}>
          <p style={{ fontSize:15, fontWeight:700, color:"#374151", marginBottom:8 }}>📝 場所を教えてください（任意）</p>
          <input
            value={otherMemo}
            onChange={e => setOtherMemo(e.target.value)}
            placeholder="例：山形屋前、宮崎神宮付近..."
            style={{ width:"100%", padding:"12px 14px", fontSize:16, border:"2px solid #e2e8f0", borderRadius:12, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }}
          />
          <p style={{ fontSize:12, color:"#9ca3af", marginTop:6 }}>入力していただくと新スポット追加の参考にします</p>
        </div>
      )}
      <div style={{ height:24 }} />
      <Btn color="#dc2626" sh="rgba(220,38,38,0.35)" onClick={submit} disabled={!level}>📣　報告する！</Btn>
    </Shell>
  );

  // ── DONE ──────────────────────────────────────
  if (screen === "done") return (
    <Shell>
      <div style={{ textAlign:"center", padding:"44px 0 32px" }}>
        <div style={{ fontSize:76, marginBottom:14 }}>🎉</div>
        <h2 style={{ fontSize:28, fontWeight:900, color:"#111827", lineHeight:1.4, marginBottom:12 }}>報告できました！</h2>
        <p style={{ fontSize:17, color:"#6b7280", lineHeight:1.9, marginBottom:40 }}>皆さんに知らせました。<br/>ご協力ありがとうございました！</p>
        <Btn color="#1d4ed8" sh="rgba(29,78,216,0.3)" onClick={() => setScreen("list")}>📋　渋滞情報を見る</Btn>
        <div style={{ height:12 }} />
        <Btn color="#6b7280" sh="rgba(107,114,128,0.25)" onClick={() => setScreen("home")}>🏠　トップに戻る</Btn>
      </div>
    </Shell>
  );

  // ── LIST ──────────────────────────────────────
  if (screen === "list") return (
    <Shell>
      <Back onClick={() => setScreen("home")} />
      <h2 style={{ fontSize:22, fontWeight:900, color:"#111827", textAlign:"center", marginBottom:16 }}>今の渋滞情報</h2>

      {/* 閲覧側フィルター */}
      <div style={{ marginBottom:20 }}>
        <p style={{ fontSize:13, color:"#6b7280", fontWeight:700, marginBottom:10 }}>⏱️ 表示する期間</p>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {FILTER_OPTIONS.map(f => {
            const on = filter === f.value;
            const count = f.value===9999
              ? reports.length
              : reports.filter(r => (Date.now()-r.postedAt) <= f.value*3600000).length;
            return (
              <button key={f.value} onClick={() => setFilter(f.value)} style={{ padding:"8px 14px", borderRadius:20, background:on?"#1d6fb8":"#fff", border:`2px solid ${on?"#1d6fb8":"#e5e7eb"}`, color:on?"#fff":"#374151", fontSize:14, fontWeight:on?900:600, cursor:"pointer", fontFamily:"inherit", boxShadow:on?"0 3px 12px rgba(29,111,184,0.25)":"none", transition:"all 0.15s" }}>
                {f.label}<span style={{ marginLeft:5, fontSize:12, opacity:0.8 }}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {filteredReports.length === 0 && (
        <div style={{ textAlign:"center", padding:"40px 0" }}>
          <p style={{ fontSize:36, marginBottom:12 }}>🟢</p>
          <p style={{ color:"#9ca3af", fontSize:16 }}>この期間の報告はありません</p>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {filteredReports.map(r => {
          const l    = LEVELS.find(x => x.value===r.level);
          const sp   = SPOTS.find(x => x.id===r.spotId);
          const done = voted.includes(r.id);
          return (
            <div key={r.id} style={{ background:"#fff", borderRadius:20, border:`2px solid ${l?.border}`, padding:"16px 18px 14px", boxShadow:`0 2px 14px ${l?.shadow}` }}>
              {sp && <span style={{ fontSize:11, fontWeight:700, color:AREA_COLORS[sp.area], background:`${AREA_COLORS[sp.area]}18`, padding:"2px 10px", borderRadius:20, display:"inline-block", marginBottom:8 }}>{sp.area}</span>}
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
                <span style={{ fontSize:42 }}>{l?.emoji}</span>
                <div>
                  <p style={{ fontSize:20, fontWeight:900, color:"#111827", marginBottom:2 }}>{r.name}</p>
                  <p style={{ fontSize:16, fontWeight:800, color:l?.color }}>{l?.label}</p>
                  <p style={{ fontSize:13, color:"#9ca3af", marginTop:2 }}>🕐 {timeAgo(r.postedAt)}</p>
                </div>
              </div>
              <button onClick={() => vote(r.id)} style={{ width:"100%", padding:"13px", background:done?"#f0fdf4":"#f8fafc", border:`2px solid ${done?"#86efac":"#e2e8f0"}`, borderRadius:14, fontSize:17, fontWeight:800, color:done?"#15803d":"#6b7280", cursor:done?"default":"pointer", fontFamily:"inherit", transition:"all 0.2s" }}>
                {done ? "✅ 私も見ました！" : `👍 私も見た　（${r.votes}人）`}
              </button>
            </div>
          );
        })}
      </div>

      <div style={{ height:24 }} />
      <a
        href="https://www.google.com/maps/@31.910,131.420,13z/data=!5m1!1e1"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration:"none", display:"block", marginBottom:12 }}
      >
        <div style={{ padding:"16px", background:"#fff", border:"2px solid #e5e7eb", borderRadius:18, fontSize:17, fontWeight:900, color:"#1a1a2e", textAlign:"center", boxShadow:"0 3px 12px rgba(0,0,0,0.07)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
          <span style={{ fontSize:22 }}>🗾</span>
          <span>Googleマップでリアルタイム確認</span>
          <span style={{ fontSize:13, color:"#9ca3af" }}>↗</span>
        </div>
      </a>
      <Btn color="#dc2626" sh="rgba(220,38,38,0.35)" onClick={startReport}>🗺️　地図から渋滞を報告する</Btn>
    </Shell>
  );

  // ── ADMIN ─────────────────────────────────────
  if (screen === "admin") return (
    <Shell>
      <Back onClick={() => setScreen("home")} />
      <h2 style={{ fontSize:22, fontWeight:900, color:"#111827", marginBottom:4 }}>🔧 管理画面</h2>
      <p style={{ fontSize:13, color:"#9ca3af", marginBottom:24 }}>「その他」報告の集計・スポット追加</p>

      {/* 「その他」メモ集計 */}
      <div style={{ background:"#fff", border:"2px solid #e2e8f0", borderRadius:16, padding:"16px 18px", marginBottom:20 }}>
        <p style={{ fontSize:15, fontWeight:900, color:"#111827", marginBottom:12 }}>📊 「その他」場所メモ 集計</p>
        {Object.keys(memoCount).length === 0 ? (
          <p style={{ fontSize:14, color:"#9ca3af" }}>まだ「その他」のメモ報告はありません</p>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {Object.entries(memoCount).sort((a,b)=>b[1]-a[1]).map(([memo, count]) => (
              <div key={memo} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc", borderRadius:10, padding:"10px 14px" }}>
                <span style={{ fontSize:15, fontWeight:700, color:"#111827" }}>📍 {memo}</span>
                <span style={{ fontSize:14, fontWeight:900, color:"#1d6fb8", background:"#eff6ff", padding:"2px 10px", borderRadius:20 }}>{count}件</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 新スポット追加フォーム */}
      <div style={{ background:"#fff", border:"2px solid #e2e8f0", borderRadius:16, padding:"16px 18px", marginBottom:20 }}>
        <p style={{ fontSize:15, fontWeight:900, color:"#111827", marginBottom:16 }}>➕ 新スポットを追加</p>
        <AdminAddSpot onAdd={(name, area, lat, lng) => { addSpot(name, area, lat, lng); alert(`「${name}」を追加しました！`); }} />
      </div>

      {/* 現在のスポット一覧 */}
      <div style={{ background:"#fff", border:"2px solid #e2e8f0", borderRadius:16, padding:"16px 18px" }}>
        <p style={{ fontSize:15, fontWeight:900, color:"#111827", marginBottom:12 }}>📋 現在のスポット一覧（{SPOTS.length}箇所）</p>
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          {SPOTS.map(sp => (
            <div key={sp.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", background:"#f8fafc", borderRadius:10 }}>
              <span style={{ fontSize:11, fontWeight:700, color:AREA_COLORS[sp.area], background:`${AREA_COLORS[sp.area]}18`, padding:"2px 8px", borderRadius:20, whiteSpace:"nowrap" }}>{sp.area}</span>
              <span style={{ fontSize:14, fontWeight:600, color:"#111827", flex:1 }}>{sp.name}</span>
              <span style={{ fontSize:11, color:"#9ca3af", fontFamily:"monospace" }}>{sp.lat.toFixed(3)},{sp.lng.toFixed(3)}</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

// ── 共通部品 ─────────────────────────────────────
function AdminAddSpot({ onAdd }) {
  const [name, setName] = useState("");
  const [area, setArea] = useState("中心部");
  const [lat,  setLat]  = useState("");
  const [lng,  setLng]  = useState("");
  const areas = ["中心部","南部","北部・住吉","郊外","その他"];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
      <div>
        <p style={{ fontSize:12, color:"#6b7280", marginBottom:4 }}>スポット名</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="例：山形屋前交差点" style={{ width:"100%", padding:"10px 12px", fontSize:15, border:"2px solid #e2e8f0", borderRadius:10, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
      </div>
      <div>
        <p style={{ fontSize:12, color:"#6b7280", marginBottom:4 }}>エリア</p>
        <select value={area} onChange={e=>setArea(e.target.value)} style={{ width:"100%", padding:"10px 12px", fontSize:15, border:"2px solid #e2e8f0", borderRadius:10, fontFamily:"inherit", outline:"none", background:"#fff" }}>
          {areas.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <div style={{ flex:1 }}>
          <p style={{ fontSize:12, color:"#6b7280", marginBottom:4 }}>緯度</p>
          <input value={lat} onChange={e=>setLat(e.target.value)} placeholder="31.9112" style={{ width:"100%", padding:"10px 12px", fontSize:14, border:"2px solid #e2e8f0", borderRadius:10, fontFamily:"monospace", outline:"none", boxSizing:"border-box" }} />
        </div>
        <div style={{ flex:1 }}>
          <p style={{ fontSize:12, color:"#6b7280", marginBottom:4 }}>経度</p>
          <input value={lng} onChange={e=>setLng(e.target.value)} placeholder="131.4195" style={{ width:"100%", padding:"10px 12px", fontSize:14, border:"2px solid #e2e8f0", borderRadius:10, fontFamily:"monospace", outline:"none", boxSizing:"border-box" }} />
        </div>
      </div>
      <p style={{ fontSize:11, color:"#9ca3af" }}>💡 緯度・経度はGoogleマップで場所を右クリックすると取得できます</p>
      <button
        onClick={() => { if(name&&lat&&lng){ onAdd(name,area,lat,lng); setName(""); setLat(""); setLng(""); }}}
        disabled={!name||!lat||!lng}
        style={{ padding:"12px", background:(!name||!lat||!lng)?"#d1d5db":"#1d6fb8", color:"#fff", border:"none", borderRadius:12, fontSize:16, fontWeight:900, cursor:(!name||!lat||!lng)?"not-allowed":"pointer", fontFamily:"inherit" }}
      >
        ➕ スポットを追加する
      </button>
    </div>
  );
}

function Shell({ children }) {
  return (
    <div style={{ fontFamily:"'Noto Sans JP','Hiragino Kaku Gothic ProN',sans-serif", background:"#f1f5f9", minHeight:"100vh", paddingBottom:48 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap'); *{box-sizing:border-box;margin:0;padding:0} button:active{transform:scale(0.97)}`}</style>
      <div style={{ background:"#1d6fb8", padding:"14px 20px", display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:26 }}>🚦</span>
        <span style={{ fontSize:19, fontWeight:900, color:"#fff" }}>宮崎市 渋滞マップ</span>
      </div>
      <div style={{ maxWidth:480, margin:"0 auto", padding:"22px 16px" }}>{children}</div>
    </div>
  );
}
function Btn({ children, color, sh, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:"20px 16px", background:disabled?"#d1d5db":color, color:"#fff", border:"none", borderRadius:18, fontSize:20, fontWeight:900, cursor:disabled?"not-allowed":"pointer", fontFamily:"inherit", boxShadow:disabled?"none":`0 6px 20px ${sh}`, transition:"all 0.2s" }}>{children}</button>;
}
function Back({ onClick }) {
  return <button onClick={onClick} style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#6b7280", fontFamily:"inherit", fontWeight:800, marginBottom:18, padding:"4px 0", display:"flex", alignItems:"center", gap:6 }}>← 戻る</button>;
}
function Prog({ step=2 }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:8, marginBottom:26 }}>
      {[1,2].map(n => (
        <div key={n} style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:step>=n?"#1d6fb8":"#e5e7eb", color:step>=n?"#fff":"#9ca3af", display:"flex", alignItems:"center", justifyContent:"center", fontSize:17, fontWeight:900, boxShadow:step===n?"0 0 0 4px rgba(29,111,184,0.18)":"none", transition:"all 0.3s" }}>{n}</div>
          {n<2 && <div style={{ width:28, height:4, borderRadius:2, background:step>n?"#1d6fb8":"#e5e7eb", transition:"all 0.3s" }} />}
        </div>
      ))}
    </div>
  );
}
function Q({ children }) {
  return <p style={{ fontSize:20, fontWeight:900, color:"#111827", marginBottom:18, lineHeight:1.5 }}>{children}</p>;
}
