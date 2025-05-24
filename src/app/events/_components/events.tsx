"use client";

import { useQuery } from "@tanstack/react-query";
import AllEvents from "./all_events";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { QUERY_KEYS } from "@/utils/query-keys";

export default function Events() {
  const { getEvents } = SERVER_FUNCTIONS;

  const { data: events, isPending } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: getEvents,
  });
  return (
    <div className="flex flex-col gap-4">
      <AllEvents events={events} isPending={isPending} />
    </div>
  );
}
