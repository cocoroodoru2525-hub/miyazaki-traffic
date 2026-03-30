export const metadata = {
  title: "宮崎市の通勤渋滞を避けるコツ5選！時間・ルート・アプリを賢く使おう｜のりあい",
  description: "宮崎市の通勤渋滞を避けるコツをまとめました。時間帯・迂回ルート・一ツ葉有料道路の活用など、すぐに使えるテクニック5選！",
  openGraph: {
    title: "宮崎市の通勤渋滞を避けるコツ5選！",
    description: "宮崎市の通勤渋滞を避けるコツをまとめました。時間帯・迂回ルート・一ツ葉有料道路の活用など、すぐに使えるテクニック5選！",
    url: "https://noriai.jp/blog/commute-tips",
    images: [{ url: "https://noriai.jp/ogp.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "宮崎市の通勤渋滞を避けるコツ5選！",
    description: "宮崎市の通勤渋滞を避けるコツをまとめました。時間帯・迂回ルート・一ツ葉有料道路の活用など、すぐに使えるテクニック5選！",
    images: ["https://noriai.jp/ogp.png"],
  },
};

export default function CommuteTipsPage() {
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
        <div style={{ fontSize: 13, color: "#9ca3af", marginBottom: 12 }}>2026年3月30日</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#111827", lineHeight: 1.4, marginBottom: 16 }}>
          宮崎市の通勤渋滞を避けるコツ5選！時間・ルート・アプリを賢く使おう
        </h1>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          毎朝の通勤渋滞にストレスを感じていませんか？ちょっとした工夫で渋滞を大幅に回避できます。宮崎市民のための渋滞回避テクニックをまとめました。
        </p>
        <Tip number={1} emoji="⏰" title="時間をずらすだけで大きく変わる" color="#1d6fb8">
          宮崎市の通勤ラッシュは7時30分から9時がピーク。15分から30分早めるだけで渋滞をほぼ回避できます。逆に9時15分以降に出発すると道がかなり空きます。フレックス勤務が可能な方はぜひ試してみてください。
        </Tip>
        <Tip number={2} emoji="🗺️" title="橘橋・大淀大橋を避ける迂回ルートを知っておく" color="#dc2626">
          中心部への橋は渋滞の定番スポット。高松橋・天満橋・宮崎大橋など複数の橋を状況に応じて使い分けるのがコツです。普段から複数のルートに慣れておくと、いざというときに役立ちます。
        </Tip>
        <Tip number={3} emoji="🛣️" title="一ツ葉有料道路を活用する" color="#d97706">
          南部から中心部・空港方面へは一ツ葉有料道路が有効です。料金はかかりますが時間短縮効果は大きく、特に急いでいるときや雨の日に重宝します。
        </Tip>
        <Tip number={4} emoji="📱" title="のりあいでリアルタイム確認してから出発" color="#059669">
          出発前にのりあい（noriai.jp）で現在の渋滞状況を確認する習慣をつけると、ルート選びがスムーズになります。15分ごとに自動更新されるので、最新の情報をもとに判断できます。
        </Tip>
        <Tip number={5} emoji="🌧️" title="月曜・雨の日は特に注意" color="#7c3aed">
          月曜の朝と雨の日は通常より渋滞が長引く傾向があります。これらの日は特に早め出発がおすすめ。天気予報をチェックして前日から準備しておきましょう。
        </Tip>
        <div style={{ background: "#eff6ff", border: "2px solid #bfdbfe", borderRadius: 16, padding: "20px 24px", marginTop: 32, marginBottom: 32 }}>
          <p style={{ fontSize: 16, fontWeight: 900, color: "#1d4ed8", marginBottom: 8 }}>🚦 出発前にのりあいをチェック！</p>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            宮崎市内の渋滞状況をリアルタイムで確認できます。無料・登録不要、15分ごとに自動更新。毎朝の習慣にしてください。
          </p>
          <a href="/" style={{ display: "inline-block", background: "#1d6fb8", color: "#fff", padding: "12px 28px", borderRadius: 12, fontWeight: 900, fontSize: 15, textDecoration: "none" }}>
            🗺️ 今の渋滞を確認する
          </a>
        </div>
        <div style={{ borderTop: "2px solid #e5e7eb", paddingTop: 24 }}>
          <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.8 }}>
            ※ 渋滞状況は曜日・天候・季節により異なります。本記事の情報はあくまで参考としてご活用ください。
          </p>
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <a href="/" style={{ display: "inline-block", background: "#1d6fb8", color: "#fff", padding: "14px 32px", borderRadius: 14, fontWeight: 900, fontSize: 16, textDecoration: "none" }}>
            🏠 トップに戻る
          </a>
        </div>
      </div>
    </div>
  );
}

function Tip({ number, emoji, title, color, children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderLeft: `6px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, flexShrink: 0 }}>
          {number}
        </div>
        <p style={{ fontSize: 17, fontWeight: 900, color: "#111827", lineHeight: 1.4 }}>{emoji} {title}</p>
      </div>
      <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8 }}>{children}</p>
    </div>
  );
}
