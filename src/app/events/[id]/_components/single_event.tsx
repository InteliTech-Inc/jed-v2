"use client";

import { Event } from "@/interfaces";
import { useSingleEventStore } from "@/stores/events-store";
import { useEffect } from "react";

/**
 * This component is used to fetch the event data and store it in the single event store. It is just to store the data in the store so that the subsequent components can use the event data.
 * @param event - The event data.
 * @returns null
 */

export default function SingleEvent({ event }: { event: Event }) {
  const { setEvent } = useSingleEventStore();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage.getItem("event") !== event.id) {
      setEvent(event);
    }
  }, [event]);

  return null;
}
