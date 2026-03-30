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
          宮崎市で毎日渋滞が発生する要注意スポットをまとめました。通勤・通学・お出かけ前にぜひチェックしてください。
        </p>
        <Spot rank={1} name="橘橋周辺" area="中心部" desc="大淀川を渡る主要ルートのひとつ。朝7時から9時は橘橋を渡る車が集中し、橘通りまで渋滞が伸びることも。対岸へ向かう際は宮崎大橋や高松橋への迂回も検討を。" tip="迂回路：宮崎大橋・高松橋" />
        <Spot rank={2} name="宮崎駅前・橘通り" area="中心部" desc="宮崎市の中心商業地。通勤時間帯は駅への送迎車や路線バスが重なり慢性的な渋滞が発生。特に月曜朝は要注意。" tip="混雑時間帯：7時30分から9時" />
        <Spot rank={3} name="宮崎南バイパス" area="南部" desc="南北をつなぐ幹線道路。イオン宮崎や宮崎空港方面へのアクセスが集中するため、朝夕ともに渋滞しやすい。" tip="迂回路：一ツ葉有料道路" />
        <Spot rank={4} name="大淀大橋" area="中心部" desc="南部から中心部へ向かうルート上の橋。橘橋と並ぶ渋滞スポット。朝の通勤時間帯は橋の手前から数百メートルの渋滞が発生することも。" tip="早め出発か橘橋・天満橋へ迂回" />
        <Spot rank={5} name="生目台交差点周辺" area="南部" desc="西部の住宅地から中心部へ向かう交通が集まるポイント。宮崎南バイパスとの合流付近で特に混雑しやすい。" tip="混雑時間帯：8時から9時" />
        <div style={{ background: "#eff6ff", border: "2px solid #bfdbfe", borderRadius: 16, padding: "20px 24px", marginTop: 32, marginBottom: 32 }}>
          <p style={{ fontSize: 16, fontWeight: 900, color: "#1d4ed8", marginBottom: 8 }}>🚦 リアルタイム渋滞情報はのりあいで！</p>
          <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
            上記スポットの現在の渋滞状況は「のりあい」でリアルタイムに確認できます。15分ごとに自動更新、無料・登録不要でご利用いただけます。
          </p>
          <a href="/" style={{ display: "inline-block", background: "#1d6fb8", color: "#fff", padding: "12px 28px", borderRadius: 12, fontWeight: 900, fontSize: 15, textDecoration: "none" }}>
            🗺️ 今の渋滞を確認する
          </a>
        </div>
        <div style={{ borderTop: "2px solid #e5e7eb", paddingTop: 24 }}>
          <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.8 }}>
            ※ 本記事の渋滞情報はHERE Technologies APIのデータおよび実際の観測に基づくものです。実際の交通状況は時間帯・曜日・天候により異なります。
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

function Spot({ rank, name, area, desc, tip }) {
  const colors = ["#dc2626", "#ea580c", "#d97706", "#ca8a04", "#65a30d"];
  const color = colors[rank - 1];
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", borderLeft: `6px solid ${color}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, flexShrink: 0 }}>
          {rank}
        </div>
        <div>
          <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 700 }}>{area}</p>
          <p style={{ fontSize: 20, fontWeight: 900, color: "#111827" }}>{name}</p>
        </div>
      </div>
      <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.8, marginBottom: 10 }}>{desc}</p>
      <div style={{ background: "#f8fafc", borderRadius: 10, padding: "8px 14px", fontSize: 13, color: "#1d6fb8", fontWeight: 700 }}>
        💡 {tip}
      </div>
    </div>
  );
}
```

貼り付けたら **Ctrl+S** → ターミナルで：
```
git add .
git commit -m "ブログ記事修正"
git push