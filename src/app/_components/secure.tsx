"use client";

import PrivacyImage from "@/assets/images/secure.jpg";
import { motion } from "framer-motion";
import { headingAnimationsProp } from "@/constants/animations";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import MtnMomo from "@/assets/images/momo.jpeg";
import Telecel from "@/assets/images/telecel cash.jpeg";
import Airteltigo from "@/assets/images/arteltigo.jpg";
import VisaCard from "@/assets/images/visa.png";
import MasterCard from "@/assets/images/mastercard.png";

export default function SecuritySection() {
  return (
    <div className=" max-w-6xl mx-auto grid lg:grid-cols-2 gap-4 p-4 lg:pt-6 place-items-center lg:pb-0 lg:pr-0 lg:my-20">
      <section className="p-4">
        <motion.h3 {...headingAnimationsProp} className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Secure and Trustworthy
        </motion.h3>
        <motion.p {...headingAnimationsProp} className=" py-4 lg:py-8">
          Your data is safe with us. Every vote, payment, and user detail is protected with strong security measures. We use encryption and trusted systems to
          make sure everything runs smoothly and stays private—so you can focus on your event, not on worrying about risks.
        </motion.p>
        <section className=" flex items-center mb-3 gap-2 flex-wrap">
          <div className=" w-12 md:w-20 p-2 rounded-lg">
            <Image src={MtnMomo} alt="Mtn momo logo" />
          </div>
          <div className=" w-12 md:w-20 p-2 rounded-lg">
            <Image src={Telecel} alt="Telecel cash logo" />
          </div>
          <div className=" w-12 md:w-20 p-2 rounded-lg">
            <Image src={Airteltigo} alt="AirtelTigo logo" />
          </div>
          <div className=" w-12 md:w-20 p-2 rounded-lg">
            <Image src={VisaCard} alt="Visa card logo" />
          </div>
          <div className=" w-12 md:w-20 p-2 rounded-lg">
            <Image src={MasterCard} alt="Mastercard logo" />
          </div>
        </section>
        <Button>
          Contact support
          <Icon icon={"solar:phone-calling-rounded-linear"} className=" text-accent" />
        </Button>
      </section>
      <section className="w-full h-full overflow-hidden grid place-content-center rounded-lg  relative">
        <section className=" relative rounded-lg overflow-hidden">
          <Image src={PrivacyImage} alt="Globe" width={2000} height={2000} className=" w-full h-full" />
        </section>
      </section>
    </div>
  );
}
