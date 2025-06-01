"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const painPoints = [
  {
    title: "User Interface & Experience (UI/UX)",
    description:
      "Many platforms have really bad user interfaces that make it hard to manage events.JED's intuitive design puts you in control, allowing you to effortlessly manage events with clarity and confidence.",
    icon: "solar:user-cross-broken",
  },
  {
    title: "Instant Access",
    description:
      "Some platforms require you to contact the platform owners before you can even sign up. At JED, we've streamlined our sign-up process so you can dive right in and start planning your event, no need to contact us before you can even sign up. However, we do a quick verification to ensure every event is legitimate, so you can trust the events you find and create with confidence.",
    icon: "solar:shield-check-bold",
  },
  {
    title: "Maximize Your Earnings",
    description:
      "Many platforms take a big chunk of your event's earnings. With JED, you keep more of what you earn! Our transparent and competitive pricing ensures you do not sacrifice your hard-earned profits. We believe event organizers deserve to reap the rewards of their work, so we've kept our fees low and straightforward.",
    icon: "solar:money-bag-bold",
  },
  {
    title: "Reliable Performance You Can Count On",
    description:
      "Other platforms crash or slow down when too many people use them. With JED, your event's success is not threatened by high traffics. Our platform stays fast and stable all the time. This ensures your event runs smoothly from start to finish. You focus on your event, we've got the tech and infrastructure covered.",
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
          <p className="text-lg text-gray-600">To empower event organizers with a hassle-free experience with regards to managing their events. </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {painPoints.map((point) => (
            <motion.div key={point.title} variants={itemVariants} className="bg-white rounded-xl p-4 md:p-8">
              <div className="flex flex-col items-start gap-4">
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
