"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const painPoints = [
  {
    title: "Poor UI/UX",
    description:
      "Many platforms have really bad user interfaces that make it hard to manage events. Users struggle with complicated design and unclear guidelines. JED fixes this with a clean, simple design that anyone can use right away.",
    icon: "solar:user-cross-broken",
  },
  {
    title: "Unnecessary checks before accessing the platform",
    description:
      "Some platforms require you to contact the platform owners before you can even sign up. With JED, you can sign up and start using the platform immediately. However, we verify all events to ensure they are real and not scams.",
    icon: "solar:shield-check-bold",
  },
  {
    title: "High Commissions",
    description: "Many platforms take a big chunk of your event's earnings. JED keeps our fees low and clear. You get to keep more of your hard-earned money.",
    icon: "solar:money-bag-bold",
  },
  {
    title: "Poor Performance",
    description:
      "Other platforms crash or slow down when too many people use them. JED stays fast and stable no matter how busy your event gets. Your event runs smoothly from start to finish.",
    icon: "solar:chart-bold",
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

export default function WhyJedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-neutral-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Why we built JED?</h2>
          <p className="text-lg text-gray-600">We wanted to solve the common problems that event organizers face with other platforms. </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {painPoints.map((point) => (
            <motion.div key={point.title} variants={itemVariants} className="bg-white rounded-xl p-8">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <Icon icon={point.icon} className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{point.title}</h3>
                  <p className="text-gray-600">{point.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
