"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Picture from "@/assets/images/mockup.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import useNomineeStore from "@/stores/nominee-store";
import { QUERY_KEYS } from "@/utils/query-keys";
import { useQuery } from "@tanstack/react-query";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { transformNomineeData } from "@/lib/transform-nominee-data";
import React from "react";
import useEventsStore from "@/stores/events-store";

export default function Hero() {
  const router = useRouter();

  const { setNominees } = useNomineeStore();
  const { setEvents } = useEventsStore();
  const { getNominees, getEvents } = SERVER_FUNCTIONS;

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.NOMINEES],
    queryFn: async () => {
      const nomineeData = await getNominees();
      return transformNomineeData(nomineeData.data.nominees);
    },
  });

  const { data: events } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: async () => {
      const res = await getEvents();
      return res;
    },
  });

  React.useEffect(() => {
    if (data && events) {
      setNominees(data);
      setEvents(events.data.events);
    }
  }, [data, events?.data.events]);

  return (
    <div>
      <div className="relative min-h-[calc(100vh_-_5rem)] overflow-hidden flex flex-col items-center justify-center text-white">
        {/* Full-page vertical gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-secondary z-0" />

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0e361f] to-transparent opacity-40 blur-2xl z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block border border-white/20 rounded-full px-4 py-1 text-sm mb-8 backdrop-blur-sm"
            role="status"
            aria-label="Platform status"
          >
            Built for event organizers who want more...
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            The <span className="text-accent"> Easy Way</span> to Manage Your Events Online
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-white/90 max-w-2xl mx-auto mb-12"
          >
            Organizing and managing online events shouldn't be complicated. Our platform makes it simple to manage everything in one place—nominations, voting,
            ticketing, and more.
          </motion.p>
          <div className="flex w-fit mx-auto gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <Button
                variant={"secondary"}
                aria-label="Start free trial"
                role="button"
                onClick={() => window.open("https://app.jedevent.com/sign-up", "_blank", "noopener,noreferrer")}
              >
                Try for free
                <Icon icon="solar:arrow-right-linear" aria-hidden="true" />
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <Button
                variant={"outline"}
                aria-label="Start free trial"
                className="bg-transparent hover:border-accent"
                role="button"
                onClick={() => router.push("/topboy/chat")}
              >
                Vote Now
                <Icon icon="iconoir:thumbs-up" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="w-full max-w-7xl -mt-20 z-10 relative lg:w-[80%] mx-auto px-3 py-6 lg:py-12"
      >
        <Image
          src={Picture}
          width={2000}
          height={2000}
          alt="Product Dashboard showing event management interface"
          className="w-full h-full object-cover object-center shadow-xl rounded-xl"
          priority
        />
      </motion.section>
    </div>
  );
}
