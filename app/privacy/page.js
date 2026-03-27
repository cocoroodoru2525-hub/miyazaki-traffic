"use client";

export default function PrivacyPage() {
  return (
    <div style={{ fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif", background: "#f1f5f9", minHeight: "100vh", paddingBottom: 48 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap'); *{box-sizing:border-box;margin:0;padding:0}`}</style>

      {/* ヘッダー */}
      <div style={{ background: "#1d6fb8", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>🚦</span>
          <span style={{ fontSize: 19, fontWeight: 900, color: "#fff" }}>のりあい｜宮崎渋滞情報</span>
        </a>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111827", marginBottom: 8 }}>プライバシーポリシー</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 32 }}>最終更新日：2026年3月27日</p>

        <Section title="1. はじめに">
          のりあい（noriai.jp、以下「本サービス」）は、宮崎市民が渋滞情報をリアルタイムで共有するための無料サービスです。本プライバシーポリシーでは、本サービスにおける情報の取り扱いについて説明します。
        </Section>

        <Section title="2. 収集する情報">
          本サービスでは、以下の情報のみを収集します。
          <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 2 }}>
            <li>渋滞報告内容（場所・混雑度・任意のメモ）</li>
            <li>投稿日時</li>
            <li>「私も見た」の投票数</li>
          </ul>
          <p style={{ marginTop: 10, color: "#1d6fb8", fontWeight: 700 }}>
            ※ 氏名・メールアドレス・電話番号などの個人を特定できる情報は一切収集しません。
          </p>
          <p style={{ marginTop: 8 }}>
            本サービスはユーザー登録不要でご利用いただけます。
          </p>
        </Section>

        <Section title="3. 情報の利用目的">
          収集した情報は以下の目的のみに使用します。
          <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 2 }}>
            <li>渋滞情報のリアルタイム表示</li>
            <li>渋滞スポットの改善・追加の参考</li>
            <li>サービスの品質向上</li>
          </ul>
        </Section>

        <Section title="4. 第三者への提供">
          収集した情報を第三者に販売・提供することは一切ありません。ただし、法令に基づく開示要求があった場合はこの限りではありません。
        </Section>

        <Section title="5. 使用しているサービス">
          本サービスでは以下の外部サービスを利用しています。
          <ul style={{ marginTop: 10, paddingLeft: 20, lineHeight: 2 }}>
            <li><strong>Supabase</strong>：データベース（投稿データの保存）</li>
            <li><strong>Vercel</strong>：ホスティング</li>
            <li><strong>OpenStreetMap</strong>：地図表示</li>
            <li><strong>Google マップ</strong>：リアルタイム渋滞確認リンク</li>
          </ul>
          各サービスのプライバシーポリシーについては、各社のウェブサイトをご確認ください。
        </Section>

        <Section title="6. Cookieについて">
          本サービスでは現在、Cookieを使用していません。
        </Section>

        <Section title="7. 投稿データの削除">
          投稿した渋滞情報の削除をご希望の場合は、XのDMまたはお問い合わせよりご連絡ください。
          <p style={{ marginTop: 8 }}>X: <a href="https://x.com/noriai2026" style={{ color: "#1d6fb8" }}>@noriai2026</a></p>
        </Section>

        <Section title="8. プライバシーポリシーの変更">
          本ポリシーは予告なく変更される場合があります。変更後はこのページに掲載します。
        </Section>

        <Section title="9. お問い合わせ">
          本ポリシーに関するお問い合わせは以下までご連絡ください。
          <p style={{ marginTop: 8 }}>X: <a href="https://x.com/noriai2026" style={{ color: "#1d6fb8" }}>@noriai2026</a></p>
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
