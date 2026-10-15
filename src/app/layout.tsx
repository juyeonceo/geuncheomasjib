import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "우리동네 식당 | 로컬 음식점 탐색",
  description: "내 주변 500m, 1km, 3km 동네 음식점 정보를 찾는 반응형 웹 서비스",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

const KAKAO_KEY =
  process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || "e30478df18a03cf2bafd4226d420d4ad";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Script
          src={`${API_BASE}/api/kakao-sdk?appkey=${KAKAO_KEY}&autoload=false&libraries=services`}
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
