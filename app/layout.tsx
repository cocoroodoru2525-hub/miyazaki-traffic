import { ReactNode } from "react";
import Script from "next/script";

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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1145859481451122"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7S8LD08RLH"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7S8LD08RLH');
          `}
        </Script>
      </head>
      <body style={{ margin: 0 }}>
        {children}
        <footer style={{
          background: "#1a1a2e",
          color: "#9ca3af",
          textAlign: "center",
          padding: "24px 16px",
          fontSize: 13,
          marginTop: 0,
        }}>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px 24px", marginBottom: 12 }}>
            <a href="/about" style={{ color: "#9ca3af", textDecoration: "none" }}>運営者情報</a>
            <a href="/privacy" style={{ color: "#9ca3af", textDecoration: "none" }}>プライバシーポリシー</a>
            <a href="/terms" style={{ color: "#9ca3af", textDecoration: "none" }}>利用規約</a>
            <a href="/contact" style={{ color: "#9ca3af", textDecoration: "none" }}>お問い合わせ</a>
            <a href="https://x.com/noriai2026" target="_blank" rel="noopener noreferrer" style={{ color: "#9ca3af", textDecoration: "none" }}>𝕏 @noriai2026</a>
          </div>
          <div>© 2026 のりあい運営事務局</div>
        </footer>
      </body>
    </html>
  );
}
