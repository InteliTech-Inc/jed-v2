"use client";

import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import LogoImage from "../../public/images/logo.png";
import Image from "next/image";

export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="relative bg-primary px-6 pt-20 lg:pt-36 text-white  overflow-hidden">
      {/* Footer content */}
      <div className="grid text-center gap-8 md:grid-cols-2 lg:grid-cols-3 p-10 lg:place-content-center">
        <div className="flex flex-col">
          <h1 className="mx-auto md:ml-0 font-semibold text-xl w-fit">
            Useful Links
          </h1>
          <div className="flex flex-col  md:text-left my-6 space-y-3 text-md">
            <Link href={"/"} className="hover:text-accent">
              Home
            </Link>
            <Link href={"/about"} className="hover:text-accent">
              About
            </Link>
            <Link href={"/blog"} className="hover:text-accent">
              Blog
            </Link>
            <Link href={"/#faq"} className="hover:text-accent">
              FAQs
            </Link>
            <Link href={"/topboy/chat"} className="hover:text-accent">
              Vote Now
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:items-start ">
          <h1 className="font-semibold md:text-left text-xl">
            Contact & Address
          </h1>
          <div className="flex flex-col items-center md:items-start md:text-left my-6 space-y-3 text-md">
            <a
              href="mailto:info.jedvotes@gmail.com"
              className="hover:text-accent flex items-center gap-2"
            >
              <Icon icon={"material-symbols-light:mail-outline"} />
              info.jedvotes@gmail.com
            </a>
            <a
              href="tel:0599774425"
              className="hover:text-accent flex items-center gap-2"
            >
              <Icon icon={"solar:phone-calling-linear"} />
              0599774425 | 0538122885
            </a>
            <a
              href="http://wa.me/+233264602978"
              className="hover:text-accent flex items-center gap-2"
            >
              <Icon icon={"uil:whatsapp"} />
              Contact us on Whatsapp
            </a>
            <p className="flex items-center gap-2 text-inherit">
              <Icon icon={"la:map-pin"} />
              Kumasi - Ghana
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center w-fit mx-auto md:items-start">
          <Image src={LogoImage} alt="Logo" className="w-auto h-auto" />
        </div>
      </div>
      <section className="border-t-secondary/30 text-white/90 p-6 flex flex-col lg:flex-row border-t px-6 mx-auto justify-between">
        <section className=" inline-flex flex-col lg:flex-row text-center items-center gap-4">
          <p className=" mx-auto text-sm text-inherit ">
            &copy; {date} InteliTech Inc. All rights reserved.
          </p>
          <ul className="flex gap-4 text-sm">
            <li className="hover:text-accent">
              <Link href="/legal/terms">Terms of Use</Link>
            </li>
            <li className="hover:text-accent">
              <Link href="/legal/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </section>
        <section>
          <div className="flex justify-center py-6 gap-4">
            <a
              href="https://www.instagram.com/jed.event?igsh=MTVxNmk3cnJlYWxuNA=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon={"proicons:instagram"}
                className="hover:text-accent size-6 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              />
            </a>
            <Link
              href="https://www.linkedin.com/company/ican-code/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon={"jam:linkedin-square"}
                className="hover:text-accent size-6 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              />
            </Link>
            <a
              href="https://x.com/jed_event?t=rrgklc_dChJnFjdFtUAasA&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                icon={"proicons:x-twitter"}
                className="hover:text-accent size-6 transition-all duration-300 cursor-pointer hover:-translate-y-1"
              />
            </a>
          </div>
        </section>
      </section>
    </footer>
  );
}
