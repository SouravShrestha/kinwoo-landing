import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002"),
  title: "Kinwoo - Shared Expenses",
  description: "Track shared expenses, manage groceries and keep everyone on the same page.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable} style={{ backgroundColor: "#000000" }}>
      <head>
        {/* Plain script, not next/script: AdSense rejects the data-nscript attribute next/script adds. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3867903352379411"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Without JS the scroll-reveal observer never runs; show everything. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;filter:none!important;transform:none!important}</style>",
          }}
        />
        {children}
      </body>
    </html>
  );
}
