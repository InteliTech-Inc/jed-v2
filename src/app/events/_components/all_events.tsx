"use client";

import { Event } from "@/interfaces";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Vote, SearchX } from "lucide-react";
import SearchBar from "./search_bar";
import EventCard from "./event_card";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function AllEvents({ events }: { events: Event[] }) {
  const [isSearching, setIsSearching] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const searchParams = useSearchParams();

  const handleReset = () => {
    setFilteredEvents(events);
    setIsSearching(false);
  };

  const searchQuery = searchParams.get("q");

  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery) {
        setFilteredEvents(events);
        return;
      }

      setIsSearching(true);
      try {
        const searchTerms = searchQuery.toLowerCase().trim().split(/\s+/);

        const filtered = events.filter((event) => {
          const searchableText = [event.name, event.description].filter(Boolean).join(" ").toLowerCase();

          return searchTerms.every((term) => searchableText.includes(term));
        });

        setFilteredEvents(filtered);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [searchQuery, events]);

  const eventsGrid = useMemo(() => {
    if (filteredEvents.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="col-span-full flex flex-col items-center justify-center py-12 text-center"
        >
          <SearchX className="size-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No events found {searchQuery ? `for "${searchQuery}"` : ""}</h3>
          <p className="text-gray-500 mt-1">
            {searchQuery ? "Try adjusting your search terms. You can search by event name or description" : "There are no events available at the moment"}
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={cardVariants}
              layout
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    );
  }, [filteredEvents, searchQuery]);

  return (
    <div className="flex flex-col w-full gap-4 p-6 lg:p-10 mt-12">
      <div className="flex items-center justify-center sm:justify-between">
        <SearchBar placeholder="Search events..." queryKey="q" handleReset={handleReset} />
        <Link href="/topboy/chat" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            Vote Now
            <Vote className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
      <div className={`mt-4 ${isSearching ? "opacity-50" : ""}`}>{eventsGrid}</div>
    </div>
  );
}
