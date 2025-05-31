import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AllEvents from "./all_events";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { QUERY_KEYS } from "@/utils/query-keys";

export default async function Events() {
  const { getEvents } = SERVER_FUNCTIONS;
  const queryClient = new QueryClient();

  const { data } = await queryClient.fetchQuery({
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: getEvents,
  });

  return (
    <div className="flex flex-col gap-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllEvents events={data.events} />
      </HydrationBoundary>
    </div>
  );
}
