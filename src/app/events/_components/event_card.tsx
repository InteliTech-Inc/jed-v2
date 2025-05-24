"use client";

import { Event } from "@/interfaces";
import Image from "next/image";
import { IconLivePhoto, IconEye } from "@tabler/icons-react";
import Link from "next/link";

export default function EventCard({ event }: Readonly<{ event: Event }>) {
  return (
    <div className="group transition-all duration-300">
      <Link href={`/events/${event.id}`} className="block w-full text-left">
        <div className="relative h-80 w-full overflow-hidden rounded-lg mb-3 transition-all duration-300">
          <div className="absolute top-2 right-2 z-10">
            <p>
              <IconLivePhoto className="size-4 text-green-500 animate-pulse" />
            </p>
          </div>
          <Image
            src={event?.media?.url}
            alt={event?.name}
            width={500}
            height={500}
            className="h-full absolute top-0 left-0 w-full object-cover scale-105 group-hover:scale-100 transition-all duration-500"
            priority
          />
          <div className="absolute bottom-0 h-2/5 left-0 w-full p-3 bg-gradient-to-t from-black via-black/70 to-transparent">
            <span className="group-hover:-translate-y-4 px-1 translate-y-0 transition-all duration-300 absolute bottom-2 text-white">
              <p className=" font-semibold text-white">{event?.name}</p>
              <p className="text-white/80 text-sm text-pretty line-clamp-1 ">
                {event?.description}
              </p>
            </span>
            <div className="translate-y-10 flex items-center gap-2 group-hover:translate-y-0 transition-all duration-300 absolute bottom-2 text-white font-semibold">
              <p>
                <IconEye className="size-4 text-white/80" />
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
