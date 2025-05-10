import Hero from "@/app/_components/hero";
import WhatWeOffer from "@/app/_components/what_we_offer";
import WhyWorkWithUs from "@/app/_components/why_jed";
import WhoItsFor from "@/app/_components/who_its_for";
import FAQ from "@/app/_components/faqs";
import { Metadata } from "next";
import Security from "@/app/_components/secure";
import TrustedBy from "@/app/_components/trusted_by";

export const metadata: Metadata = {
  title: "Home",
  description:
    "We provide all the tools you need to create great online events. We offer e-voting, nominations submissions, and ticketing. Our platform is easy to use for both organizers and participants.",
  keywords: ["event management", "online events", "event platform", "online ticketing", "e-voting", "e-nominations"],
  openGraph: {
    title: "JED - Event Management Platform",
    description:
      "Your all-in-one platform for managing online events. From ticketing to nominations and voting, we make event management simple and efficient.",
    type: "website",
  },
  twitter: {
    title: "JED - Event Management Platform",
    description:
      "Your all-in-one platform for managing online events. From ticketing to nominations and voting, we make event management simple and efficient.",
  },
};

export default async function HomePage() {
  return (
    <main className="min-h-screen" role="main">
      <Hero />
      <TrustedBy />
      <WhatWeOffer />
      <WhyWorkWithUs />
      <WhoItsFor />
      <FAQ />
      <Security />
    </main>
  );
}
