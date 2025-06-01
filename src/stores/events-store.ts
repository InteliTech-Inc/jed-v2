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
      setEvents: (newEvents) =>
        set((state) => {
          const isSame =
            JSON.stringify(state.events) === JSON.stringify(newEvents);
          if (isSame) {
            return { ...state, isLoading: false };
          }
          return {
            ...state,
            events: newEvents,
            isLoading: false,
          };
        }),
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
