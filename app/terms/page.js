"use client";

export default function TermsPage() {
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
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111827", marginBottom: 8 }}>利用規約</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 32 }}>最終更新日：2026年3月30日</p>

        <Section title="1. はじめに">
          本利用規約は、のりあい（noriai.jp、以下「本サービス」）の利用条件を定めるものです。本サービスをご利用いただくことで、本規約に同意したものとみなします。
        </Section>
        <Section title="2. サービスの内容">
          本サービスは、宮崎市内の渋滞情報をリアルタイムで提供する無料の情報サービスです。交通情報APIを用いて自動収集したデータを地図上に表示します。
        </Section>
        <Section title="3. 免責事項">
          <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 2 }}>
            <li>本サービスの渋滞情報は参考情報であり、実際の交通状況と異なる場合があります。</li>
            <li>本サービスの利用により生じた損害について、運営者は一切の責任を負いません。</li>
            <li>システムメンテナンスや障害により、予告なくサービスが停止する場合があります。</li>
            <li>情報の正確性・完全性・有用性を保証するものではありません。</li>
          </ul>
        </Section>
        <Section title="4. 禁止事項">
          本サービスの利用にあたり、以下の行為を禁止します。
          <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 2 }}>
            <li>本サービスへの不正アクセスやサーバーへの過度な負荷をかける行為</li>
            <li>本サービスのデータを無断で商業目的に利用する行為</li>
            <li>法令または公序良俗に反する行為</li>
            <li>その他、運営者が不適切と判断する行為</li>
          </ul>
        </Section>
        <Section title="5. 知的財産権">
          本サービスのデザイン・コンテンツに関する知的財産権は運営者に帰属します。無断転載・複製を禁じます。なお、地図データはOpenStreetMap貢献者、交通情報はHERE Technologiesのライセンスに基づきます。
        </Section>
        <Section title="6. サービスの変更・終了">
          運営者は、事前の告知なく本サービスの内容を変更、または提供を終了することがあります。重要な変更はX（@noriai2026）にてお知らせします。
        </Section>
        <Section title="7. 規約の変更">
          本規約は予告なく変更される場合があります。変更後はこのページに掲載します。
        </Section>
        <Section title="8. お問い合わせ">
          本規約に関するお問い合わせは以下までご連絡ください。
          <p style={{ marginTop: 8 }}>X: <a href="https://x.com/noriai2026" style={{ color: "#1d6fb8" }}>@noriai2026</a></p>
          <p style={{ marginTop: 8 }}>メール: <a href="mailto:noriai2026@outlook.jp" style={{ color: "#1d6fb8" }}>noriai2026@outlook.jp</a></p>
        </Section>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <a href="/" style={{ display: "inline-block", background: "#1d6fb8", color: "#fff", padding: "14px 32px", borderRadius: 14, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            🏠 トップに戻る
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <h2 style={{ fontSize: 17, fontWeight: 900, color: "#111827", marginBottom: 12, borderLeft: "4px solid #1d6fb8", paddingLeft: 10 }}>{title}</h2>
      <div style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}