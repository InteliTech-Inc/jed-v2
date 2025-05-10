"use client";

import Mockup from "@/assets/images/mockup.png";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "USSD Support",
    description: "Let people vote or buy tickets using a short code on any phone—no internet needed.",
    longDescription:
      "With our USSD feature, people can vote, or buy tickets from any phone even without internet. They just dial a short code and follow simple prompts.",
    type: "ussd",
  },
  {
    title: "Real-time results",
    description: "See votes and ticket sales update instantly as they happen.",
    type: "results",
  },
  {
    title: "Performance & Reliability",
    description: "The platform stays fast and works smoothly, even during peak times.",
    longDescription:
      "Whether you're handling hundreds or thousands of users, the platform stays fast and stable. It's built to perform well even during high-traffic moments like voting deadlines.",
    type: "performance",
  },
  {
    title: "Revenue Tracker",
    description: "Track all the money from votes and tickets in one place",
    type: "revenue",
  },
  {
    title: "Analytics",
    description: "Get simple charts and insights to help you understand your audience and improve your event.",
    type: "analytics",
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

export default function WhyWorkWithUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 mt-4 lg:mt-20 lg:px-8" ref={ref} aria-labelledby="why-choose-heading">
      {/* Header Section */}
      <motion.div
        className="text-center max-w-screen-sm mx-auto mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" id="why-choose-heading">
          Why choose JED?
        </h2>
        <p className="text-lg md:text-xl mt-6">
          The best of design, user experience and more important features for the <span className="text-secondary/70">success of your online event.</span>
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        role="list"
        aria-label="Key features and benefits"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className={`bg-[#f2f7e5] rounded-xl p-6 ${
              feature.type === "revenue" ? "md:col-span-2 lg:col-span-1" : feature.type === "analytics" ? "lg:col-span-2" : ""
            }`}
            role="listitem"
            aria-labelledby={`${feature.type}-heading`}
            tabIndex={0}
          >
            <h3 id={`${feature.type}-heading`} className="font-bold text-gray-900 text-xl">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 mb-6">{feature.description}</p>

            {feature.type === "ussd" && (
              <motion.div className="bg-white rounded-xl mt-3 p-4 relative" transition={{ duration: 0.2 }} role="img" aria-label="USSD code display">
                <div className="flex justify-center items-center h-24">
                  <span className="text-6xl font-bold" aria-label="USSD code">
                    *USSD#
                  </span>
                </div>
              </motion.div>
            )}

            {feature.type === "results" && (
              <motion.div className="bg-white rounded-xl p-4 relative" transition={{ duration: 0.2 }} role="img" aria-label="Live results display">
                <div className="flex items-center mb-4">
                  <div className="w-2 aspect-square bg-accent rounded-full mr-2" aria-hidden="true"></div>
                  <span className="text-xs text-gray-500">Live</span>
                  <div className="ml-auto px-3 flex items-center py-1 bg-gray-800 rounded-full">
                    <span className="text-xs text-white">Export results</span>
                  </div>
                </div>

                <div className="space-y-2" role="list" aria-label="Organization results">
                  {["CHEESA", "APCES", "GESA", "SOCIOSO", "HESA"].map((org) => (
                    <div key={org} className="flex items-center" role="listitem">
                      <span className="text-xs text-gray-500 w-16">{org}</span>
                      <div className="flex-1 h-6 bg-gray-100 rounded" aria-hidden="true"></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {feature.type === "performance" && (
              <motion.div className="flex justify-center items-center h-48" transition={{ duration: 0.2 }} role="img" aria-label="Performance uptime indicator">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-100" aria-hidden="true"></div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-8 border-accent"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    aria-hidden="true"
                  ></motion.div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-accent font-bold text-xl">Uptime</span>
                    <span className="text-accent font-bold text-sm">99%</span>
                  </div>
                </div>
              </motion.div>
            )}

            {feature.type === "revenue" && (
              <motion.div className="flex justify-center" transition={{ duration: 0.2 }} role="img" aria-label="Revenue tracking display">
                <div className="relative w-64 bg-black rounded-3xl p-2 overflow-hidden">
                  <div className="bg-accent rounded-2xl p-4">
                    <div className="text-3xl font-bold text-white text-center my-2" aria-label="Current time">
                      14:23
                    </div>
                  </div>

                  <div className="mt-4 space-y-2" role="list" aria-label="Recent transactions">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="bg-gray-800 rounded-lg p-2 flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        role="listitem"
                      >
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold mr-2" aria-hidden="true">
                          S
                        </div>
                        <div className="text-xs text-white">
                          <p className="text-gray-200 text-sm">Paystack</p>
                          <p className="text-gray-400 text-xs">Payment Received</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {feature.type === "analytics" && (
              <motion.section transition={{ duration: 0.2 }} role="img" aria-label="Analytics dashboard preview">
                <Image src={Mockup} alt="Analytics dashboard showing event data and insights" className="w-full h-auto" loading="lazy" priority={false} />
              </motion.section>
            )}

            {feature.longDescription && (
              <section className="mt-8">
                <p className="text-sm">{feature.longDescription}</p>
              </section>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
