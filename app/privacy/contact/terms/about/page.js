"use client";

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", background: "#f1f5f9", minHeight: "100vh", paddingBottom: 48 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap'); *{box-sizing:border-box;margin:0;padding:0}`}</style>
      <div style={{ background: "#1d6fb8", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🚦</span>
          <span style={{ fontSize: 19, fontWeight: 900, color: "#fff" }}>のりあい｜宮崎渋滞情報</span>
        </a>
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111827", marginBottom: 8 }}>運営者情報</h1>
        <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 32 }}>のりあいについて</p>

        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#111827", marginBottom: 16, borderLeft: "4px solid #1d6fb8", paddingLeft: 10 }}>サービス概要</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15, color: "#374151" }}>
            <tbody>
              {[
                ["サービス名", "のりあい（noriaki.jp）"],
                ["サービス内容", "宮崎市内リアルタイム渋滞情報の提供"],
                ["対象エリア", "宮崎市内"],
                ["運営者", "のりあい運営事務局"],
                ["所在地", "宮崎県宮崎市"],
                ["開始日", "2026年3月"],
              ].map(([label, value]) => (
                <tr key={label} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "10px 0", fontWeight: 700, width: "35%", color: "#6b7280" }}>{label}</td>
                  <td style={{ padding: "10px 0" }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#111827", marginBottom: 16, borderLeft: "4px solid #1d6fb8", paddingLeft: 10 }}>サービスへの想い</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.9 }}>
            宮崎市内の渋滞に悩む市民のために、誰でも無料で使える渋滞情報サービスを作りました。<br /><br />
            「のりあい」という名前には、情報を乗り合わせてみんなで快適な移動を実現したい、という想いを込めています。<br /><br />
            地域に根ざした情報インフラとして、宮崎市民の日々の移動に少しでも役立てれば幸いです。
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", marginBottom: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#111827", marginBottom: 16, borderLeft: "4px solid #1d6fb8", paddingLeft: 10 }}>使用技術・データ</h2>
          <ul style={{ fontSize: 15, color: "#374151", lineHeight: 2, paddingLeft: 20 }}>
            <li><strong>フロントエンド</strong>：Next.js / Leaflet.js</li>
            <li><strong>データベース</strong>：Supabase</li>
            <li><strong>ホスティング</strong>：Vercel</li>
            <li><strong>交通情報</strong>：HERE Technologies API</li>
            <li><strong>地図</strong>：OpenStreetMap</li>
            <li><strong>住所情報</strong>：国土地理院API</li>
          </ul>
        </div>

        <div style={{ background: "#1d6fb8", borderRadius: 16, padding: "24px", marginBottom: 32, textAlign: "center" }}>
          <p style={{ color: "#fff", fontSize: 15, marginBottom: 16, fontWeight: 700 }}>SNSでも情報発信中！</p>
          <a href="https://x.com/noriai2026" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#000", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            <span style={{ fontSize: 18 }}>𝕏</span> @noriai2026
          </a>
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="/" style={{ display: "inline-block", background: "#1d6fb8", color: "#fff", padding: "14px 32px", borderRadius: 14, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            🏠 トップに戻る
          </a>
        </div>
      </div>
    </div>
  );
}