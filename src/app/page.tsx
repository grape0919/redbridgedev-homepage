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
        <Hero />
        <About />
        <Services />
        <Process />
        <Portfolio />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
