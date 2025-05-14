"use client";

import PrivacyImage from "@/assets/images/secure.jpg";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import MtnMomo from "@/assets/images/momo.jpeg";
import Telecel from "@/assets/images/telecel cash.jpeg";
import Airteltigo from "@/assets/images/arteltigo.jpg";
import VisaCard from "@/assets/images/visa.png";
import MasterCard from "@/assets/images/mastercard.png";
import { useRouter } from "next/navigation";

const paymentMethods = [
  { src: MtnMomo, alt: "MTN Mobile Money payment option" },
  { src: Telecel, alt: "Telecel Cash payment option" },
  { src: Airteltigo, alt: "AirtelTigo Money payment option" },
  { src: VisaCard, alt: "Visa card payment option" },
  { src: MasterCard, alt: "Mastercard payment option" },
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

export default function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  return (
    <section
      className="max-w-6xl mt-10 mx-auto grid lg:grid-cols-2 gap-10 p-5 lg:pt-6 place-items-center lg:pb-0 lg:pr-0 lg:my-20"
      ref={ref}
      aria-labelledby="security-heading"
    >
      <motion.section className="" variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        <motion.h3 id="security-heading" variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Secure and Trustworthy
        </motion.h3>
        <motion.p variants={itemVariants} className="py-4 lg:py-8">
          Your data is safe with us. Every vote, payment, and user detail is protected with strong security measures. We use encryption and trusted systems to
          make sure everything runs smoothly and stays private—so you can focus on your event, not on worrying about risks.
        </motion.p>
        <motion.section className="flex items-center mb-3 gap-2 flex-wrap" variants={itemVariants} role="list" aria-label="Supported payment methods">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.alt}
              className="w-12 md:w-20 p-2 rounded-lg bg-white/5 backdrop-blur-sm"
              role="listitem"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.2,
                delay: index * 0.1,
              }}
            >
              <Image src={method.src} alt={method.alt} className="w-full h-auto object-contain" loading="lazy" />
            </motion.div>
          ))}
        </motion.section>
        <motion.div variants={itemVariants}>
          <Button onClick={() => router.push("/support/contact")} aria-label="Contact support team" className="group">
            Contact support
            <Icon icon="solar:phone-calling-rounded-linear" className="text-accent ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
        </motion.div>
      </motion.section>

      <motion.section
        className="w-full h-full overflow-hidden grid place-content-center rounded-lg relative"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={PrivacyImage}
            alt="Security and privacy illustration showing data protection"
            width={2000}
            height={2000}
            className="w-full h-full object-cover"
            priority={false}
            loading="lazy"
          />
        </div>
      </motion.section>
    </section>
  );
}
