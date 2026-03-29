"use client";
import Link from "next/link";

export default function MapPage() {
  return (
    <div style={{ fontFamily: "sans-serif", display: "flex", flexDirection: "column", height: "100vh" }}>

      {/* ヘッダー */}
      <div style={{ background: "#1d4ed8", color: "white", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 20 }}>🚦</span>
        <span style={{ fontWeight: "bold", fontSize: 18 }}>宮崎市 渋滞マップ</span>
      </div>

      {/* ナビゲーション */}
      <div style={{ background: "#1e3a8a", display: "flex", gap: 0, flexShrink: 0 }}>
        <Link href="/" style={{ padding: "10px 20px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13 }}>
          📍 渋滞マップ
        </Link>
        <Link href="/map" style={{ padding: "10px 20px", color: "white", textDecoration: "none", background: "#2563eb", fontWeight: "bold", fontSize: 13, borderBottom: "3px solid white" }}>
          🗺️ Googleマップ
        </Link>
        <Link href="/data" style={{ padding: "10px 20px", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 13 }}>
          📊 1ヶ月データ
        </Link>
      </div>

      {/* メインコンテンツ */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🗺️</div>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#1e293b", marginBottom: 8 }}>
            Googleマップ 渋滞情報
          </div>
          <div style={{ fontSize: 14, color: "#64748b", marginBottom: 32, lineHeight: 1.7 }}>
            宮崎市のリアルタイム渋滞情報を<br />Googleマップで確認できます。<br />
            <span style={{ fontSize: 12, color: "#94a3b8" }}>※ 赤・橙色の道路が渋滞箇所です</span>
          </div>
          <a
            href="https://www.google.com/maps/@31.9077,131.4202,13z/data=!5m1!1e1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#1d4ed8",
              color: "white",
              padding: "14px 36px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: 16,
              boxShadow: "0 4px 12px rgba(29,78,216,0.3)",
            }}
          >
            🗺️ Googleマップで開く
          </a>
        </div>
      </div>
    </div>
  );
}
