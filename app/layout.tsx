import { ReactNode } from "react";

export const metadata = {
  title: "のりあい｜宮崎渋滞情報",
  description: "宮崎のみんなで作るリアルタイム渋滞マップ。渋滞してるよ！をみんなに伝えよう。無料・市民参加型。",
  openGraph: {
    title: "のりあい｜宮崎渋滞情報",
    description: "宮崎のみんなで作るリアルタイム渋滞マップ。渋滞してるよ！をみんなに伝えよう。",
    url: "https://noriai.jp",
    siteName: "のりあい",
    images: [
      {
        url: "https://noriai.jp/ogp.png",
        width: 1200,
        height: 630,
        alt: "のりあい｜宮崎渋滞情報",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "のりあい｜宮崎渋滞情報",
    description: "宮崎のみんなで作るリアルタイム渋滞マップ。渋滞してるよ！をみんなに伝えよう。",
    images: ["https://noriai.jp/ogp.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}