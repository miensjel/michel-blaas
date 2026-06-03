import type { Metadata } from "next";

export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import WorksSection from "@/components/WorksSection";
import StudioSection from "@/components/StudioSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { home } from "@/content/home";

export const metadata: Metadata = {
  title:       home.meta.title,
  description: home.meta.description,
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <WorksSection />
        <StudioSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
