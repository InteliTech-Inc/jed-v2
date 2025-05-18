"use client";

import { EventResponse } from "@/interfaces";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Vote, SearchX } from "lucide-react";
import SearchBar from "./search_bar";
import EventCard from "./event_card";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function AllEvents({
  events,
}: {
  readonly events: EventResponse;
}) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setSearchQuery(query);
  }, [searchParams]);

  const statuses = useMemo(() => {
    const uniqueStatuses = new Set(
      events.data.events?.map((event) => event.event_progress)
    );
    return Array.from(uniqueStatuses);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.data.events?.filter((event) => {
      const matchesSearch = searchQuery
        ? event.name.toLowerCase().includes(searchQuery.toLowerCase()) ??
          event.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesStatus =
        selectedStatus === "all" || event.event_progress === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [events, searchQuery, selectedStatus]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedStatus("all");
  };

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
          <h3 className="text-lg font-semibold text-gray-900">
            No events found {searchQuery ? `for "${searchQuery}"` : ""}
          </h3>
          <p className="text-gray-500 mt-1">
            {searchQuery
              ? "Try adjusting your search terms. You can search by event name or description"
              : "There are no events available at the moment"}
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <SearchBar
            placeholder="Search events..."
            queryKey="q"
            handleReset={handleReset}
          />
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-60 rounded-full shadow-none !h-12">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status} className="capitalize">
                  {status.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link href="/topboy/chat" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            Vote Now
            <Vote className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
      <div className="mt-4">{eventsGrid}</div>
    </div>
  );
}
