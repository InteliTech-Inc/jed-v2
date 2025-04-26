"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Picture from "@/assets/images/mockup.png";
import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <div className="relative min-h-[calc(100vh_-_5rem)] overflow-hidden flex flex-col items-center justify-center text-white">
        {/* Full-page vertical gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-secondary z-0" />

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0e361f] to-transparent opacity-40 blur-2xl z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="inline-block border border-white/20 rounded-full px-4 py-1 text-sm mb-8 backdrop-blur-sm">Built for global customers</div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            The <span className="text-accent"> Easy Way</span> to Manage Your Events Online
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
            Organizing and managing online events shouldn't be complicated. Our platform makes it simple to manage everything in one place—nominations, voting,
            ticketing, and more.
          </p>
          <div className="">
            <Button variant={"secondary"}>
              Try for free
              <Icon icon="solar:arrow-right-linear" />
            </Button>
          </div>
        </div>
      </div>
      <section className="w-full max-w-7xl -mt-20 z-10 relative lg:w-[80%] mx-auto px-3 py-6 lg:py-12">
        <Image src={Picture} width={2000} height={2000} alt="Product Dashboard" className="w-full h-full object-cover object-center shadow-xl rounded-xl" />
      </section>
    </div>
  );
}
