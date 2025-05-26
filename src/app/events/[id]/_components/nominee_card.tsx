import { Nominee } from "@/interfaces";
import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import Link from "next/link";

type NomineeCardProps = {
  nominee: Nominee;
  eventId: string;
  display_results: boolean;
};

export default function NomineeCard({
  nominee,
  eventId,
  display_results,
}: Readonly<NomineeCardProps>) {
  return (
    <div className="group transition-all duration-300">
      <div className="relative h-72 w-full overflow-hidden rounded-xl transition-all duration-300">
        <Image
          src={nominee.image}
          alt={nominee.name}
          width={500}
          height={500}
          className="h-full absolute top-0 left-0 w-full object-cover scale-105 group-hover:scale-100 transition-all duration-500"
          priority
          decoding="async"
        />
        <div className="absolute bottom-0 h-3/5 left-0 w-full p-3 bg-gradient-to-t from-black via-black/80 to-transparent">
          <span className="absolute bottom-3 block w-[90%] ">
            <span className="flex flex-col mb-3 group-hover:-translate-y-1 translate-y-0 transition-all duration-300 ">
              <p className="text-white text-lg font-semibold">{nominee.name}</p>
              <span className="flex flex-row gap-2 justify-between">
                <p className="text-white/80 text-sm">{nominee.category}</p>
                <span className="flex flex-row gap-2">
                  {display_results && (
                    <p className="text-white/80 flex gap-1 items-center text-xs">
                      <ThumbsUp className="size-3" />
                      {nominee.totalVotes}
                    </p>
                  )}

                  <p className="text-accent text-xs">{nominee.code}</p>
                </span>
              </span>
            </span>
            <div className="flex justify-center gap-2">
              <Link
                href={`/events/${eventId}/nominee/${nominee.id}`}
                className=" w-full"
              >
                <button className="w-full text-sm py-2 px-4 bg-white/95 text-black rounded-full hover:bg-white/90 transition-colors">
                  Vote
                </button>
              </Link>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
