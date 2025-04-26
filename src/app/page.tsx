import Hero from "@/app/_components/hero";
import WhatWeOffer from "@/app/_components/what_we_offer";
import WhyWorkWithUs from "@/app/_components/why_jed";
import WhoItsFor from "@/app/_components/who_its_for";
import FAQ from "@/app/_components/faqs";
import { Metadata } from "next";
import Security from "@/app/_components/secure";
import { HOME_SCHEMA } from "@/structured-data/home.schema";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  return (
    <main className="">
      <script
        type="application/ld+json"
        id="schema-home"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_SCHEMA) }}
      />
      <Hero />
      <WhatWeOffer />
      <WhyWorkWithUs />
      <WhoItsFor />
      <FAQ />
      <Security />
    </main>
  );
}
