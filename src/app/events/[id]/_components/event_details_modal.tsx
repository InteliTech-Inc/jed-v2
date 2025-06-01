"use client";

import { Event } from "@/interfaces";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use_media_query";
import Image from "next/image";
import { format } from "date-fns";

import { DialogTitle } from "@radix-ui/react-dialog";

type EventDetailsModalProps = {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
};

export default function EventDetailsModal({ event, isOpen, onClose }: Readonly<EventDetailsModalProps>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy");
  };

  if (!event) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLocaleLowerCase()) {
      case "not_started":
        return "bg-blue-200 text-blue-700 border border-blue-700";
      case "ongoing":
        return "bg-yellow-200 text-yellow-700 border border-yellow-700";
      case "completed":
        return "bg-green-200 text-green-700 border border-green-700";
      default:
        return "bg-gray-100 text-gray-500 border border-gray-500";
    }
  };

  const content = (
    <div className="flex flex-col h-full">
      <div className="relative h-[33vh] md:h-[40vh] w-full">
        <Image src={event.media?.url} alt={event.name} width={1000} height={1000} className="object-cover h-full w-full" priority />
        <div className="" />
      </div>

      {/* Content Section */}

      <div className="grid p-6 md:grid-cols-2  gap-4 text-sm">
        {event.voting_period.start && (
          <div>
            <p className="text-gray-500">Voting Period</p>
            <p className="font-medium text-sm text-gray-900">
              {formatDate(event.voting_period.start)} - {formatDate(event.voting_period.end)}
            </p>
          </div>
        )}
        <div>
          <p className="text-gray-500">Number of Categories</p>
          <p className="font-medium text-sm text-gray-900">{event.categories.length}</p>
        </div>
        <div className="flex !w-full col-span-2 justify-between items-center gap-6">
          <div className="w-full">
            <p className="text-gray-500 mb-1 w-full">Event Progress</p>
            <p
              className={`text-black/90 border items-center flex justify-center border-gray-200 rounded-full w-fit px-2.5  text-sm capitalize ${getStatusColor(
                event.event_progress
              )}`}
            >
              {event.event_progress.toLowerCase()}
            </p>
          </div>
          <div className="text-gray-500  w-full">
            <p className="text-gray-500">Results</p>
            <p
              className={`text-black/90 border items-center flex justify-center border-gray-200 rounded-full w-fit px-2.5  text-sm capitalize ${getStatusColor(
                event.display_results ? "displayed" : "not displayed"
              )}`}
            >
              {event.display_results ? "displayed" : "not displayed"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle className="sr-only">{event.name}</DialogTitle>
        <DialogContent className="max-w-xl  p-0 border-none overflow-hidden">{content}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTitle className="sr-only">{event.name}</SheetTitle>
      <SheetContent side="bottom" className=" p-0 rounded-t-xl">
        {content}
      </SheetContent>
    </Sheet>
  );
}
