import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "@/interfaces";

type EventsActions = {
  setEvents: (events: Event[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

type EventsStore = {
  events: Event[];
  isLoading?: boolean;
};

const initialState: EventsStore = {
  events: [],
  isLoading: false,
};

const useEventsStore = create<EventsStore & EventsActions>()(
  persist(
    (set) => ({
      ...initialState,
      setEvents: (events) =>
        set((state) => ({
          ...state,
          events,
          isLoading: false,
        })),
      setIsLoading: (isLoading) =>
        set((state) => ({
          ...state,
          isLoading,
        })),
    }),
    {
      name: "events-store",
    }
  )
);
export default useEventsStore;
export type { EventsStore, EventsActions };
