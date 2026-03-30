"use client";

export default function ContactPage() {
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
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111827", marginBottom: 8 }}>お問い合わせ</h1>
        <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 32 }}>ご意見・ご要望・不具合報告など、お気軽にご連絡ください。</p>

        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#111827", marginBottom: 16, borderLeft: "4px solid #1d6fb8", paddingLeft: 10 }}>X（旧Twitter）でのDM</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            最も迅速に対応できます。XのDMにてお気軽にご連絡ください。
          </p>
          <a href="https://x.com/noriai2026" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#000", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            <span style={{ fontSize: 18 }}>𝕏</span> @noriai2026
          </a>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#111827", marginBottom: 16, borderLeft: "4px solid #1d6fb8", paddingLeft: 10 }}>メール</h2>
          <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            メールでのお問い合わせも受け付けています。
          </p>
          <a href="mailto:noriai2026@outlook.jp"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1d6fb8", color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            ✉️ noriai2026@outlook.jp
          </a>
        </div>

        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", marginBottom: 32, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: 17, fontWeight: 900, color: "#111827", marginBottom: 12, borderLeft: "4px solid #1d6fb8", paddingLeft: 10 }}>よくあるお問い合わせ</h2>
          <div style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>
            <p style={{ fontWeight: 700, marginTop: 12 }}>Q. 渋滞情報が実際と違う</p>
            <p>A. 交通情報APIのデータを使用しているため、実際の状況と多少異なる場合があります。XのDMにてご報告ください。</p>
            <p style={{ fontWeight: 700, marginTop: 12 }}>Q. 宮崎市外のデータはありますか？</p>
            <p>A. 現在は宮崎市内のみ対応しています。今後の拡張を検討しています。</p>
            <p style={{ fontWeight: 700, marginTop: 12 }}>Q. サービスはいつまで続きますか？</p>
            <p>A. 可能な限り継続運営の予定です。サービス終了の際は事前にXでお知らせします。</p>
          </div>
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