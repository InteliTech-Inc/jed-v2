"use client";

import Image from "next/image";
import Awards from "@/assets/images/awards.jpg";
import Pageant from "@/assets/images/pegeant.jpg";
import TvShow from "@/assets/images/tv.jpg";
import School from "@/assets/images/schools.jpg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const eventTypes = [
  {
    title: "Awards Events",
    description: "Run smooth and fair award shows with easy nominations, voting, and real-time results.",
    image: Awards,
    delay: 0,
  },
  {
    title: "Pageants",
    description:
      "Manage every part of your pageant—from contestant voting to ticket sales—with one easy-to-use system. Give your audience a smooth and fun experience.",
    image: Pageant,
    delay: 0.2,
  },
  {
    title: "TV & Reality Shows",
    description:
      "Let viewers vote and stay engaged with real-time updates. Our platform supports fast voting, clear results, and tools to keep your audience excited and involved.",
    image: TvShow,
    delay: 0.4,
  },
  {
    title: "Schools, Churches, Institutions and more...",
    description:
      "Whether it's a school election, church awards, or a community contest, our platform makes it easy to manage votes, track results, and sell tickets. It's simple to use, works on any device, and fits events of all sizes.",
    image: School,
    delay: 0.6,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function WhoItsFor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="p-4 sm:p-6 md:p-12" ref={ref} aria-labelledby="who-its-for-heading">
      <motion.div
        className="max-w-screen-md text-center mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 id="who-its-for-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Built for event organizers who want more.
        </h2>
      </motion.div>

      <motion.div className="mx-auto mt-16 max-w-6xl" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2" role="list" aria-label="Event types">
          {eventTypes.map((event) => (
            <motion.div
              key={event.title}
              variants={itemVariants}
              className="relative group overflow-hidden rounded-2xl p-6 shadow-lg h-[26rem]"
              role="listitem"
              aria-labelledby={`${event.title.toLowerCase().replace(/\s+/g, "-")}-heading`}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black z-10" aria-hidden="true" />
                <Image
                  src={event.image}
                  alt={`${event.title} background image`}
                  fill
                  className=" scale-110 group-hover:scale-100 transition-all duration-300 object-cover object-top"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div className="relative translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20 flex flex-col justify-between h-full">
                <div className="mt-auto">
                  <h3 id={`${event.title.toLowerCase().replace(/\s+/g, "-")}-heading`} className="text-xl font-bold text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-white/90">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
