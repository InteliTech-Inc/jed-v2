"use client";

import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";
import { Event } from "@/interfaces";
import EventDetailsModal from "../[id]/_components/event_details_modal";

export default function EventDetailsButton({ event }: { event: Event }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button className=" shadow-none w-full md:w-auto" onClick={() => setIsModalOpen(true)}>
        View Details
        <Info className="mr-2 h-4 w-4" />
      </Button>
      <EventDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={event} />
    </>
  );
}
