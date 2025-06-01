import React from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import AllEvents from "./all_events";
import { QUERY_OPTIONS } from "@/functions/server";

export default async function Events() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(QUERY_OPTIONS.EVENTS);

  return (
    <div className="flex flex-col gap-4">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllEvents />
      </HydrationBoundary>
    </div>
  );
}
