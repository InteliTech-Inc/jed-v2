"use client";

import { Event } from "@/interfaces";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type EventDetailsModalProps = {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
};

export default function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-2 group p-0 border-0 overflow-hidden [&>button]:bg-accent [&>button]:rounded-full [&>button]:size-8 [&>button]:top-4 [&>button]:right-4 [&>button]:hover:bg-accent/90 [&>button]:grid [&>button]:place-content-center">
        <DialogTitle className="sr-only">Event Details</DialogTitle>
        <div className="relative w-full h-[79vh]">
          <Image src={event.image} alt={event.name} fill className="object-cover " priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-300 group-hover:backdrop-blur-xs" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{event.name}</h2>
            <p className="text-lg mb-6 text-white/90">{event.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold mb-1 text-white/90">Voting Period</p>
                <p className="text-white/80">
                  {formatDate(event.voting_period.start)} - {formatDate(event.voting_period.end)}
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1 text-white/90">Categories</p>
                <p className="text-white/80">{event.categories} Categories</p>
              </div>

              <p className="text-white/80 capitalize w-fit border border-white/20 rounded-full text-sm px-5 py-1">{event.eventProgress}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
