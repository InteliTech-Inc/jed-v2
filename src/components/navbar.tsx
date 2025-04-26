"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import MobileNavbar from "./mobile_navbar";
import SolutionsDropDown from "./solutions_dropdown";
import { Button } from "./ui/button";
import LogoImage from "../../public/images/logo.png";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";

export const NavLinks = [
  {
    name: "Home",
    path: "/",
    icon: "solar:home-2-broken",
    activeIcon: "solar:home-2-bold-duotone",
    dropdown: false,
  },
  {
    name: "Events",
    path: "/events",
    icon: "solar:calendar-mark-line-duotone",
    activeIcon: "solar:calendar-mark-bold-duotone",
    dropdown: false,
  },
  {
    name: "Solutions",
    path: "/solutions",
    icon: "solar:backpack-line-duotone",
    activeIcon: "solar:backpack-bold-duotone",
    dropdown: <SolutionsDropDown />,
  },
  {
    name: "About",
    path: "/about",
    icon: "solar:question-circle-line-duotone",
    activeIcon: "solar:question-circle-bold-duotone",
    dropdown: false,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: "solar:notes-line-duotone",
    activeIcon: "solar:notes-bold-duotone",
    dropdown: false,
  },
];

export default function Navbar() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHome = pathname === "/";

  useEffect(() => {
    if (navIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [navIsOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 50;

      if (scrollPosition > scrollThreshold) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={` sticky top-0 z-50 transition-colors duration-300   ${
        hasScrolled || !isHome ? "bg-white" : "bg-primary text-white"
      }`}
    >
      <div
        className={` ${
          hasScrolled ? "" : "border-b-0"
        } max-w-7xl flex p-4  lg:py-6 gap-8 justify-between items-center border-b mx-auto `}
      >
        {/* Logo & Mobile Menu Icon */}
        <section className="flex justify-between items-center w-full lg:w-fit">
          <Link href="/">
            <Logo />
          </Link>

          <AnimatePresence>
            {!navIsOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="lg:hidden h-fit"
              >
                <div className="p-2.5 rounded-full bg-primary text-accent">
                  <Icon
                    icon="solar:hamburger-menu-line-duotone"
                    className="w-6 h-6"
                    onClick={() => setNavIsOpen(true)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Mobile Navbar */}
        <AnimatePresence>
          {navIsOpen && (
            <MobileNavbar
              isOpen={navIsOpen}
              closeButtonHandler={() => setNavIsOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Desktop Navbar Links */}
        <section className={`hidden h-fit lg:block`}>
          <nav className="h-fit p-0 w-full">
            <ul className="flex gap-4 pt-6 lg:pt-0">
              {NavLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.path}
                    className={`${
                      !link.dropdown
                        ? "hover:underline hover:text-accent hover:underline-offset-4"
                        : "hover:text-secondary"
                    } ease-in duration-100 flex items-center gap-2`}
                  >
                    {link.name}{" "}
                    {link.dropdown && (
                      <Icon
                        icon="solar:alt-arrow-down-outline"
                        className="w-4 h-4"
                      />
                    )}
                  </Link>
                  {link.dropdown && link.dropdown}
                </li>
              ))}
            </ul>
          </nav>
        </section>

        {/* Login Button */}
        <section className="hidden lg:flex gap-4">
          <Button
            variant={"secondary"}
            onClick={() => {
              router.push("/about#contact");
            }}
          >
            Contact <Icon icon={"solar:phone-calling-rounded-linear"} />
          </Button>
          <Button>
            Log In <Icon icon={"solar:login-2-outline"} />
          </Button>
        </section>
      </div>
    </div>
  );
}

export function Logo() {
  return (
    <Image
      src={LogoImage}
      alt="Logo"
      className="w-auto h-auto"
      width={60}
      height={40}
    />
  );
}
