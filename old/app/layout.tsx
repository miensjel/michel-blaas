import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Michel Bekkers — Productontwerper",
  description:
    "Portfolio van Michel Bekkers — industrieel ontwerper in Rotterdam. Meubels, verlichting en objecten in hout, keramiek en metaal.",
  openGraph: {
    title: "Michel Bekkers — Productontwerper",
    description:
      "Portfolio van Michel Bekkers — industrieel ontwerper in Rotterdam.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
