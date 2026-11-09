"use client";

import Navigation from "@/components/ui/Navigation";
import CustomCursor from "@/components/ui/CustomCursor";
import ChannelTalk from "@/components/ui/ChannelTalk";
// import LoadingScreen from "@/components/ui/LoadingScreen";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* <LoadingScreen /> */}
      <CustomCursor />
      <ChannelTalk />
      <main className="relative">
        <Navigation />
        {/* 설득 흐름: 가치 제안 → 무엇을 → 증거 → 어떻게 → 왜 우리 → 궁금증 → 문의 */}
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <About />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
