"use client";

import { Category, Event, Nominee } from "@/interfaces";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NomineeCard from "./nominee_card";
import SearchBar from "@/app/events/_components/search_bar";
import { SearchX } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import NomineesEmpty from "@/assets/images/nominees_empty.png";
import BackButton from "@/components/back";
type NomineesGridProps = {
  nominees: Nominee[];
  event: Event;
  category: Category;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function NomineesGrid({ nominees, event, category }: Readonly<NomineesGridProps>) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setSearchQuery(query);
  }, [searchParams]);

  const filteredNominees = useMemo(() => {
    setIsSearching(true);
    const filtered = nominees.filter((nominee) => {
      const matchesSearch = searchQuery
        ? nominee.name.toLowerCase().includes(searchQuery.toLowerCase()) || nominee.code.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesCategory = selectedCategory === "all" || nominee.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
    setIsSearching(false);
    return filtered;
  }, [nominees, searchQuery, selectedCategory]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setIsSearching(false);
  };

  return (
    <div className=" mb-10 w-full">
      <div className="h-[20rem] relative mb-14">
        <Image
          className="h-full animate-pulse w-full object-cover object-center "
          src={event.media?.url}
          width={2000}
          height={2000}
          alt={event.name}
          priority
        />
        <div className="absolute inset-0 bg-black/70 flex items-center flex-col justify-center backdrop-blur-sm">
          <Image
            className="h-[10rem]  w-[10rem] object-cover object-center rounded-full border-white border-2"
            src={event.media?.url}
            width={2000}
            height={2000}
            alt={event.name}
            priority
          />
          <p className="text-white text-2xl md:text-4xl font-bold text-center my-4">{event.name}</p>
          <p className=" text-slate-200  px-4">Nominees for {category.name}</p>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex px-6 flex-col gap-4 md:flex-row justify-between mt-10 md:items-center"
      >
        <div className="">
          <BackButton />
        </div>
        <div className="flex gap-4 items-center md:flex-row flex-col w-full md:w-auto">
          <div className="relative w-full">
            <SearchBar placeholder="Search by name or code..." queryKey="q" handleReset={handleReset} />
          </div>
        </div>
      </motion.div>

      <div className={`mt-4 ${isSearching ? "opacity-50" : ""}`}>
        {filteredNominees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="col-span-full flex flex-col items-center justify-center py-12 text-center"
          >
            <Image src={NomineesEmpty} alt="No nominees found" className="w-60 h-40 object-center object-cover" />
            <h3 className="text-lg font-semibold text-gray-900">No nominees found {searchQuery ? `for "${searchQuery}"` : ""}</h3>
            <p className="text-gray-500 mt-1">
              {searchQuery
                ? "Try adjusting your search terms or category filter. You can search by name, category, or nominee code"
                : "There are no nominees available for this category"}
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 mt-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredNominees.map((nominee) => (
                <motion.div
                  key={nominee.id}
                  variants={cardVariants}
                  layout
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <NomineeCard nominee={nominee} eventId={event.id} display_results={event.display_results} event_progress={event.event_progress} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
