"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";

const supportOptions = [
  {
    title: "Report Issues",
    description: "Found a bug? We'd love to hear about it in our GitHub issues.",
    icon: "solar:bug-bold",
    action: "Open GitHub Issue",
    href: "https://github.com/your-org/jed/issues",
  },
  {
    title: "Feature Requests",
    description: "Want to suggest a new feature? Share it with us and the community.",
    icon: "solar:lightbulb-bold",
    action: "Request Feature",
    href: "/support/request-feature",
  },
  {
    title: "Contact Support",
    description: "Can't find what you're looking for? Our Support Team is ready to help.",
    icon: "solar:phone-calling-rounded-bold",
    action: "Contact Us",
    href: "/support/contact",
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

export default function SupportSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How Can We Help?</h2>
          <p className="text-lg text-gray-600">We're here to support you every step of the way. Choose the best way to get in touch with us.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {supportOptions.map((option) => (
            <motion.div key={option.title} variants={itemVariants} className="bg-neutral-50/60 rounded-xl p-8  border transition-colors">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-secondary rounded-lg">
                    <Icon icon={option.icon} className="w-8 h-8 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-gray-600">{option.description}</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full group shadow-none" asChild>
                    <a href={option.href} target="_blank" rel="noopener noreferrer">
                      {option.action}
                      <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">Response time for support tickets will vary depending on the severity of the issue.</p>
        </motion.div>
      </div>
    </section>
  );
}
