export const metadata = {
  title: "ブログ｜のりあい 宮崎渋滞情報",
  description: "宮崎市の渋滞情報・道路事情に関するブログ記事一覧です。",
};

export default function BlogPage() {
  const posts = [
    {
      href: "/blog/commute-tips",
      emoji: "⏰",
      title: "宮崎市の通勤渋滞を避けるコツ5選！",
      desc: "時間帯・迂回ルート・一ツ葉有料道路の活用など、すぐに使えるテクニック5選。",
      date: "2026年3月30日",
    },
    {
      href: "/blog/worst5",
      emoji: "🔴",
      title: "宮崎市の渋滞スポットワースト5！",
      desc: "橘橋・宮崎駅前・南バイパスなど、毎日渋滞が発生する要注意スポットまとめ。",
      date: "2026年3月30日",
    },
  ];

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
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111827", marginBottom: 8 }}>📝 ブログ</h1>
        <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 32 }}>宮崎市の渋滞情報・道路事情に関する記事をまとめています。</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {posts.map((post) => (
            <a key={post.href} href={post.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderLeft: "6px solid #1d6fb8", transition: "all 0.15s" }}>
                <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 6 }}>{post.date}</div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ fontSize: 32, flexShrink: 0 }}>{post.emoji}</span>
                  <div>
                    <p style={{ fontSize: 18, fontWeight: 900, color: "#111827", marginBottom: 6, lineHeight: 1.4 }}>{post.title}</p>
                    <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{post.desc}</p>
                  </div>
                </div>
                <div style={{ marginTop: 12, fontSize: 13, color: "#1d6fb8", fontWeight: 700 }}>続きを読む →</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <a href="/" style={{ display: "inline-block", background: "#1d6fb8", color: "#fff", padding: "14px 32px", borderRadius: 14, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            🏠 トップに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
