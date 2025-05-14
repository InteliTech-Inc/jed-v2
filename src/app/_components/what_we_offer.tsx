"use client";

import Nom from "@/assets/images/nom.png";
import Ticket from "@/assets/images/ticket.png";
import Vote from "@/assets/images/vote.png";
import Image from "next/image";
import { animate, motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Nominations",
    description:
      "Manage nominations with our user-friendly platform. We have simplified the forms generation for you. Everything is organized, and you can review and approve nominations without hassle.",
    image: Nom,
    color: "text-green-700",
  },
  {
    title: "Ticketing",
    description: "Our platform makes it easy for event organizers and attendees to manage ticket purchases and registrations hassle-free.",
    image: Ticket,
    color: "text-green-700",
  },
  {
    title: "Voting",
    description:
      "Make voting quick, fair, and fun. Users can vote online or through USSD, and results update instantly. No confusion, no delays—just smooth and secure voting.",
    image: Vote,
    color: "text-green-700",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
    },
  }),
};

export default function WhatWeOffer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="max-w-7xl mx-auto mt-20 " ref={ref}>
      <motion.section
        className="max-w-screen-sm text-center mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" id="what-we-offer-heading">
          What we offer
        </h2>
        <p className="text-lg md:text-xl mt-6">
          Seamless online events organization and management features <span className="text-secondary/70">purposely built for you!</span>
        </p>
      </motion.section>
      <section className="mt-16">
        <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView={"visible"}
                  className="bg-gray-50 group border-neutral-100 border rounded-xl p-6 "
                  role="article"
                  aria-labelledby={`${feature.title.toLowerCase()}-heading`}
                >
                  <motion.div className="mb-6" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                    <Image src={feature.image} alt={`${feature.title} colored elements`} className="w-full rounded-md" loading="lazy" />
                  </motion.div>

                  <h3 id={`${feature.title.toLowerCase()}-heading`} className={`text-2xl font-medium ${feature.color} mb-3`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
