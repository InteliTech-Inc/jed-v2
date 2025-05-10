"use client";

import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import Knust from "@/assets/images/knust.png";
import UG from "@/assets/images/ug_logo.png";
import KTT from "@/assets/images/ttu_logo.png";
import Cheesa from "@/assets/images/cheesa logo.png";
import Gaesa from "@/assets/images/gaesa.jpeg";
import apces from "@/assets/images/apces.jpg";
import linggsa from "@/assets/images/linggsa.jpg";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const trustedPartners = [
  { src: Knust, alt: "Kwame Nkrumah University of Science and Technology" },
  { src: UG, alt: "University of Ghana" },
  { src: KTT, alt: "Kumasi Technical University" },
  { src: Cheesa, alt: "Chemical Engineering Students Association" },
  { src: Gaesa, alt: "Ghana Association of Engineering Students" },
  { src: apces, alt: "Association of Petroleum and Chemical Engineering Students" },
  { src: linggsa, alt: "Linguistics Students Association" },
];

export default function TrustedBy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="max-w-7xl mx-auto mt-20" ref={ref}>
      <motion.section
        className="max-w-screen-sm text-center mx-auto mb-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-bold uppercase" id="trusted-by-heading">
          Trusted by event organizers at
        </h2>
      </motion.section>
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Marquee className="py-4" reverse aria-label="Trusted partners and institutions">
          {trustedPartners.map((partner, index) => (
            <motion.div
              key={partner.alt}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="mx-4"
            >
              <Image src={partner.src} alt={partner.alt} width={100} height={100} className="object-contain" loading="lazy" />
            </motion.div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}
