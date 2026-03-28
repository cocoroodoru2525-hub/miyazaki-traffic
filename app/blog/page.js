"use client";

export default function BlogPage() {
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

        {/* 記事ヘッダー */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <div style={{ fontSize: 13, color: "#1d6fb8", fontWeight: 700, marginBottom: 10 }}>📝 管理人より</div>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111827", lineHeight: 1.5, marginBottom: 16 }}>
            「のりあい」を作った理由<br/>
            <span style={{ fontSize: 18, color: "#6b7280" }}>〜宮崎の渋滞をみんなで解決したい〜</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#1d6fb8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>のりあい管理人</p>
              <p style={{ fontSize: 12, color: "#9ca3af" }}>2026年3月28日</p>
            </div>
          </div>
        </div>

        {/* 記事本文 */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>

          <Section emoji="🚗" title="渋滞で困っていた">
            宮崎に住んでいると、朝の通勤や買い物、お出かけのたびに渋滞に悩まされることがあります。「今日はどこが混んでいるんだろう？」「別の道を使えばよかった…」そんな経験、みなさんにも心当たりがあるのではないでしょうか。
            <br/><br/>
            私自身も毎日のように渋滞に遭遇していました。でもリアルタイムで渋滞を知る方法が、なかなか見つからなかったんです。
          </Section>

          <Section emoji="💡" title="みんな、渋滞情報を知らない">
            実はGoogleマップには渋滞情報を表示する機能があります。でも、その機能を知っている人はまだまだ少ないのが現状だと思います。私自身も最初は知りませんでした。
            <br/><br/>
            「宮崎専用の、もっと手軽に使える渋滞情報サービスがあればいいのに」そう思ったのが、「のりあい」を作ったきっかけです。
          </Section>

          <Section emoji="❤️" title="自分も使いたい。みんなにも使ってほしい">
            「のりあい」は、まず自分自身が使いたくて作りました。そして家族や友人にも使ってほしい。宮崎に住むすべての人に使ってほしい。
            <br/><br/>
            通勤・通学・通院・買い物・お出かけ…日常のあらゆるシーンで、お出かけ前に渋滞をチェックできるようにしたい。そんな思いを込めています。
          </Section>

          <Section emoji="🤝" title="みんなで育てるサービスに">
            「のりあい」は、みんなが渋滞情報を報告し合うことで成り立つサービスです。一人ひとりの「渋滞してるよ！」という小さな声が、宮崎全体の交通をスムーズにする力になると信じています。
            <br/><br/>
            登録不要・完全無料で使えます。ぜひ一度試してみてください。そしてお気に入りの人に紹介してもらえると嬉しいです 😊
          </Section>

          {/* CTA */}
          <div style={{ marginTop: 32, background: "#eff6ff", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 17, fontWeight: 900, color: "#1d6fb8", marginBottom: 8 }}>🚦 さっそく使ってみる</p>
            <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>地図からスポットを選んで3タップで報告できます</p>
            <a href="/" style={{ display: "inline-block", background: "#dc2626", color: "#fff", padding: "14px 32px", borderRadius: 14, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
              🗺️ 渋滞を報告する
            </a>
          </div>
        </div>

        {/* フッター */}
        <div style={{ textAlign: "center" }}>
          <a href="/" style={{ fontSize: 14, color: "#6b7280", textDecoration: "none" }}>← トップに戻る</a>
          <span style={{ margin: "0 12px", color: "#e5e7eb" }}>|</span>
          <a href="/privacy" style={{ fontSize: 14, color: "#6b7280", textDecoration: "underline" }}>プライバシーポリシー</a>
        </div>
      </div>
    </div>
  );
}

function Section({ emoji, title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{ fontSize: 18, fontWeight: 900, color: "#111827", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
        <span>{emoji}</span>{title}
      </h2>
      <p style={{ fontSize: 16, color: "#374151", lineHeight: 2 }}>{children}</p>
    </div>
  );
}
