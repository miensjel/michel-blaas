import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";

const geistSans = Geist({
  variable: "--geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Michel Blaas — Productontwerper",
  description:
    "Portfolio van Michel Blaas, productontwerper uit Delft. Meubel, verlichting, objecten.",
  openGraph: {
    title: "Michel Blaas — Productontwerper",
    description:
      "Portfolio van Michel Blaas, productontwerper uit Delft.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="nl"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
