import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import WerkSection from "@/components/WerkSection";
import StudioSection from "@/components/StudioSection";
import ProcesSection from "@/components/ProcesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <WerkSection />
        <StudioSection />
        <ProcesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
