export default function Worst5Page() {
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
          宮崎市の渋滞スポットワースト5！朝の通勤で特に注意すべき場所まとめ
        </h1>
        <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.8, marginBottom: 32 }}>
          宮崎市で毎日渋滞が発生する「要注意スポット」をまとめました。通勤・通学・お出かけ前にぜひチェックしてください。
        </p>

        <Spot
          rank={1}
          name="橘橋周辺"
          area="中心部"
          desc="大淀川を渡る主要ルートのひとつ。朝7〜9時は橘橋を渡る車が集中し、橘通りまで渋滞が伸びることも。対岸へ向かう際は宮崎大橋や高松橋の迂回も検討を。"
          tip="迂回路：宮崎大橋・高松橋"
        />
        <Spot
          rank={2}
          name="宮崎駅前〜橘通り"
          area="中心部"
          desc="宮崎市の中心商業地。通勤時間帯は駅への送迎車や路線バスが重なり慢性的な渋滞が発生。特に月曜朝は要注意。"
          tip="時間帯：7:30〜9:00が特にひどい"
        />
        <Spot
          rank={3}
          name="宮崎南バイパス"
          area="南部"
          desc="南北をつなぐ幹線道路。イオン宮崎や宮崎空港方面へのアクセスが集中するため、朝夕ともに渋滞しやすい。信号が多く流れが悪い区間も。"
          tip="迂回路：一ツ葉有料道路"
        />
        <Spot
          rank={4}
          name="大淀大橋"
          area="中心部"
          desc="南部から中心部へ向かうルート上の橋。橘橋と並ぶ渋滞スポット。朝の通勤時間帯は橋の手前から数百メートルの渋滞が発生することも。"
          tip="早め出発か橘橋・天満橋へ迂回"
        />
        <Spot
          rank={5}
          name="生目台交差点周辺"
          area="南部"
          desc="西部の住宅地から中心部へ向かう交通が集まるポイント。宮崎南バイパスとの合流付近で特に混雑しやすい。"
          tip="時間帯：8:00〜9:00が混みやすい"
        />

        <div style={{ background: "#eff6ff", border: "2px solid #bfdbfe", borderRadius: 16, padding: "20px 24px", marginTop: 32, marginBottom: 32 }}>
          <p style={{ fontSize: 16, fontWeight: 900, color: "#1d4ed8", marginBottom: 8 }}>🚦 リアルタイム渋滞情報はのりあいで！</p>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            上記スポットの現在の渋滞状況は「のりあい」でリアルタイムに確認できます。15分ごとに自動更新、無料・登録不要でご利用いただけます。
          </p>
          <a href="/" style={{ display: "inline-block", background: "#1d6fb8", color: "#fff", padding: "12px 28px", borderRadius: 12, fontWeight: 900, fontSize: 15, textDecoration: "none" }}>
            🗺️ 今の渋滞を確認する
          </a>
        </div>

        <div style={{ borderTop: "2px solid #