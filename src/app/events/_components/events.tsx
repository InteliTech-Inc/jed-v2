import AllEvents from "./all_events";
import { SERVER_FUNCTIONS } from "@/functions/server";

export default async function Events() {
  const events = await SERVER_FUNCTIONS.getEvents();
  return (
    <div className="flex flex-col gap-4">
      <AllEvents events={events} />
    </div>
  );
}
