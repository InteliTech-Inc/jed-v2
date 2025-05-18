"use client";

import { Event } from "@/interfaces";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use_media_query";
import Image from "next/image";
import { format } from "date-fns";
import { IconLivePhoto } from "@tabler/icons-react";

type EventDetailsModalProps = {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
};

export default function EventDetailsModal({
  event,
  isOpen,
  onClose,
}: Readonly<EventDetailsModalProps>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="relative h-[33vh] md:h-[40vh] w-full">
        <Image
          src={event.img_url}
          alt={event.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold ">{event.name}</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">{event.description}</p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Event Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Voting Period</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(event.voting_period.start)} -{" "}
                      {formatDate(event.voting_period.end)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Categories</p>
                    <p className="font-medium text-gray-900">
                      {event.categories.length} Categories
                    </p>
                  </div>
                  <p className="text-black/90 border border-gray-200 rounded-full w-fit px-6 py-1 text-sm md:text-base capitalize">
                    {event.eventProgress.replace("_", " ")}
                  </p>
                </div>
              </div>

              <p className="text-white/80 capitalize w-fit border border-white/20 rounded-full text-sm px-5 py-1">
                {event.event_progress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl p-0 h-[80vh] overflow-hidden">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[70vh] p-0 rounded-t-xl">
        {content}
      </SheetContent>
    </Sheet>
  );
}
