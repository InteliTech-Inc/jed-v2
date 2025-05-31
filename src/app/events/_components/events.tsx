"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import AllEvents from "./all_events";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { QUERY_KEYS } from "@/utils/query-keys";
import useEventsStore from "@/stores/events-store";

export default function Events() {
  const { getEvents } = SERVER_FUNCTIONS;
  const { setEvents } = useEventsStore();
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: async () => {
      const res = await getEvents();
      return res;
    },
    refetchIntervalInBackground: true,
  });

  React.useEffect(() => {
    if (data) {
      setEvents(data.data.events);
    }
  }, [data, setEvents]);

  return (
    <div className="flex flex-col gap-4">
      <AllEvents />
    </div>
  );
}
