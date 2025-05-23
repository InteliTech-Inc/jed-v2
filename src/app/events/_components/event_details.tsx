"use client";

import { Event } from "@/interfaces";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use_media_query";
import { IconLivePhoto, IconEye } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Vote } from "lucide-react";

interface EventDetailsProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetails({
  event,
  isOpen,
  onClose,
}: Readonly<EventDetailsProps>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!event) return null;

  const content = (
    <div className="flex flex-col h-full">
      {/* Image Section - Takes up 1/3 of the height */}
      <div className="relative h-[33vh] md:h-[40vh] w-full">
        <Image
          src={event.media.url}
          alt={event.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-4 right-4 z-10">
          <IconLivePhoto className="size-6 text-green-500 animate-pulse" />
        </div>
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {event.name}
          </h2>
          <p className="text-white/90 text-sm md:text-base">
            {event.event_progress.replace("_", " ")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">{event.description}</p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Event Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium text-gray-900">
                      {event.event_progress.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium text-gray-900">
                      {event.categories.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href={`/events/${event.id}`} className="w-full">
                  <Button className="w-full group">
                    View Event
                    <IconEye className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div>
                <Link href={`/events/${event.id}/vote`} className="w-full">
                  <Button variant="secondary" className="w-full group">
                    Vote Now
                    <Vote className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
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
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-xl">
        {content}
      </SheetContent>
    </Sheet>
  );
}
