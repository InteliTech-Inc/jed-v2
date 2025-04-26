import Hero from "@/app/_components/hero";
import WhatWeOffer from "@/app/_components/what_we_offer";
import WhyWorkWithUs from "@/app/_components/why_jed";
import WhoItsFor from "@/app/_components/who_its_for";
import FAQ from "@/app/_components/faqs";
import { Metadata } from "next";
import Security from "@/app/_components/secure";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <main className="">
      <Hero />
      <WhatWeOffer />
      <WhyWorkWithUs />
      <WhoItsFor />
      <FAQ />
      <Security />
    </main>
  );
}
