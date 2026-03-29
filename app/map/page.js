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

      {/* 説明 */}
      <div style={{ padding: "8px 16px", background: "#f1f5f9", fontSize: 12, color: "#475569", flexShrink: 0, borderBottom: "1px solid #e2e8f0" }}>
        Googleマップのリアルタイム渋滞情報です。赤・橙色の道路が渋滞箇所です。
      </div>

      {/* Google Maps iframe - 渋滞レイヤー付き */}
      <div style={{ flex: 1, position: "relative" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d26000!2d131.4202!3d31.9077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sja!2sjp!4v1711699200000!5m2!1sja!2sjp&layer=traffic"
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="宮崎市 Googleマップ渋滞情報"
        />
      </div>
    </div>
  );
}
