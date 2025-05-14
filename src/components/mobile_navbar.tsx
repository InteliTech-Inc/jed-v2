"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { NavLinks } from "./navbar";
import { usePathname, useRouter } from "next/navigation";
import { containerVariants, itemVariants } from "@/constants/animations";
import { Button } from "./ui/button";
type MobileNavbarProps = {
  isOpen: boolean;
  closeButtonHandler: () => void;
};

export default function MobileNavbar({ isOpen, closeButtonHandler }: MobileNavbarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname?.startsWith(href);
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      className={`${isOpen ? "absolute" : "hidden"} w-full h-screen top-0 left-0 lg:hidden z-50`}
    >
      <nav className="bg-primary pt-8 w-full h-screen p-4 relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center">
          <p className="text-xl text-accent font-semibold">Menu</p>
          <button onClick={closeButtonHandler} className="p-3 rounded-full bg-accent text-secondary">
            <Icon icon="flowbite:close-outline" className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Links */}
        <motion.ul className="flex flex-col mt-8 gap-4 pt-6">
          {NavLinks.map(({ icon, name, activeIcon, path }, index) => (
            <motion.li key={name} variants={itemVariants} custom={index}>
              <Link
                href={path}
                onClick={closeButtonHandler}
                className={`${
                  isActive(path) ? "bg-accent text-primary" : "hover:text-secondary text-white"
                } font-semibold px-4 py-2.5 flex items-center gap-2 rounded-full transition-all w-full`}
              >
                <Icon icon={`${isActive(path) ? activeIcon : icon}`} className="w-7 h-6" />
                {name}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <motion.section variants={itemVariants} custom={NavLinks.length} className="flex gap-4 mt-6 lg:hidden">
          <Button variant={"secondary"} className="">
            <Link href={"/about#support"} onClick={closeButtonHandler} className=" flex gap-1 items-center">
              Contact <Icon icon={"solar:phone-calling-rounded-linear"} />
            </Link>
          </Button>
          <Button className="">
            Log In <Icon icon={"solar:login-2-outline"} />
          </Button>
        </motion.section>
      </nav>
    </motion.section>
  );
}
