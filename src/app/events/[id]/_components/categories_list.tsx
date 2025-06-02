"use client";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Category, Event } from "@/interfaces";
import EventDetailsButton from "@/app/events/_components/event_details_button";
import SearchBar from "@/app/events/_components/search_bar";
import { useSearchParams } from "next/navigation";
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

type Props = {
  data: any;
};

export default function CategoriesList({ data }: Props) {
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

  const event = {
    ...data,
    id: String(data.id),
    approval_status: data.approval_status,
    event_progress: data.event_progress,
    voting_period: {
      start: data.schedule?.voting_start_period,
      end: data.schedule?.voting_end_period,
    },
    nomination_period: {
      start: data.schedule?.nomination_start_period,
      end: data.schedule?.nomination_end_period,
    },
  } as Event;

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setSearch(query);
  }, [searchParams]);

  const filteredCategories = event.categories?.filter((category: any) => category?.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className=" mt-6 mb-10 w-full px-3">
      <div className="flex flex-col gap-4 md:flex-row justify-between mt-20  items-center">
        <div className="hidden md:block">
          <h3 className="text-3xl font-bold">Categories</h3>
        </div>
        <div className="flex gap-4 items-center md:flex-row flex-col w-full md:w-auto">
          <div className="relative w-full  ">
            <SearchBar placeholder="Search categories" queryKey="q" handleReset={() => setSearch("")} />
          </div>
          <EventDetailsButton event={event} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full my-10">
        {filteredCategories!.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredCategories?.map((category) => (
                <motion.div
                  key={category.id}
                  variants={cardVariants}
                  layout
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/events/${event.id}/nominees/${category.id}`}
                    className="block p-4 group bg-accent/50 hover:bg-accent/60 transition-all duration-150 ease-in-out hover:border-accent border border-secondary rounded-3xl text-primary w-full"
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-all duration-150 ease-in-out" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex min-h-[55dvh] flex-col items-center justify-center col-span-3"
          >
            <Image src={"/images/no-docs.svg"} width={200} height={200} alt={"Empty notification inbox"} />
            <p className="mt-5 text-center text-gray-600">Sorry, there are no categories available!</p>
          </motion.section>
        )}
      </div>
    </div>
  );
}
