"use client";

import { Event, Nominee } from "@/interfaces";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NomineeCard from "./nominee_card";
import SearchBar from "@/app/events/_components/search_bar";
import CategoryFilter from "@/app/events/[id]/_components/category_filter";
import EventDetailsModal from "@/app/events/[id]/_components/event_details_modal";
import { SearchX, Info } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

type NomineesGridProps = {
  nominees: Nominee[];
  eventId: string;
  event: Event;
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

export default function NomineesGrid({ nominees, eventId, event }: NomineesGridProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    setSearchQuery(query);
  }, [searchParams]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(nominees.map((nominee) => nominee.category));
    return Array.from(uniqueCategories);
  }, [nominees]);

  const filteredNominees = useMemo(() => {
    setIsSearching(true);
    const filtered = nominees.filter((nominee) => {
      const matchesSearch = searchQuery
        ? nominee.name.toLowerCase().includes(searchQuery.toLowerCase()) || nominee.category.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="flex flex-col w-full mt-20 gap-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <SearchBar placeholder="Search nominees..." queryKey="q" handleReset={handleReset} />
          <CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </div>
        <Button className=" shadow-none" onClick={() => setIsModalOpen(true)}>
          View Details
          <Info className="mr-2 h-4 w-4" />
        </Button>
      </div>

      <EventDetailsModal event={event} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className={`mt-4 ${isSearching ? "opacity-50" : ""}`}>
        {filteredNominees.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="col-span-full flex flex-col items-center justify-center py-12 text-center"
          >
            <SearchX className="size-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No nominees found {searchQuery ? `for "${searchQuery}"` : ""}</h3>
            <p className="text-gray-500 mt-1">
              {searchQuery ? "Try adjusting your search terms or category filter" : "There are no nominees available for this category"}
            </p>
          </motion.div>
        ) : (
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <NomineeCard nominee={nominee} eventId={eventId} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
