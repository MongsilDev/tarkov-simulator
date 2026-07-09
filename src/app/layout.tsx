import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import "./globals.css";

const nanum = Nanum_Gothic({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nanum",
});

export const metadata: Metadata = {
  title: "KORD BREACH 특성 시뮬레이터",
  description: "Escape from Tarkov 시즌 1 KORD BREACH 특성(모디파이어) 포인트 시뮬레이터",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${nanum.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
