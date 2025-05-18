import { Event } from "@/interfaces";
import data from "../data.json";
import AllEvents from "./all_events";
import { Suspense } from "react";
import EventsSkeleton from "./event_skeleton";

async function getEvents() {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 3000);
  });
  return res as Event[];
}

export default async function Events() {
  const events = await getEvents();
  return (
    <div className="flex flex-col gap-4">
      <AllEvents events={events} />
    </div>
  );
}
