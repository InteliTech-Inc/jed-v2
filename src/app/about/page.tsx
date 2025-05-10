import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import AboutImage from "@/assets/images/aboutt us.jpeg";
import { Metadata } from "next";
import WhyJedSection from "@/app/_components/about/why_jed_section";
import SupportSection from "@/app/_components/about/support_section";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JED's mission to provide intuitive, secure, and efficient event management solutions. Discover why we're different and how we're revolutionizing event organization.",
  keywords: ["about JED", "event management company", "event platform", "voting platform", "event solutions"],
  openGraph: {
    title: "About JED - Event Management Platform",
    description:
      "Learn about JED's mission to provide intuitive, secure, and efficient event management solutions. Discover why we're different and how we're revolutionizing event organization.",
    type: "website",
  },
  twitter: {
    title: "About JED - Event Management Platform",
    description:
      "Learn about JED's mission to provide intuitive, secure, and efficient event management solutions. Discover why we're different and how we're revolutionizing event organization.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={AboutImage} alt="About JED - Event Management Platform" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About JED</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            We're building the future of event management, making it easier for organizers to create amazing experiences.
          </p>
        </div>
      </section>

      <section className=" py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600">
              We're on a mission to simplify event management. We believe that organizing events should be easy, whether you're running a small gathering or a
              large-scale event. Our platform combines powerful features with a simple, intuitive interface to help you focus on what matters most.
            </p>
          </div>
        </div>
      </section>
      <WhyJedSection />
      <SupportSection />

      <section className="py-20 bg-secondary text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Events?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of event organizers who trust JED for their events. Start creating amazing experiences today.
            </p>
            <Button variant="secondary" size="lg" className="group rounded-full">
              Get Started
              <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
