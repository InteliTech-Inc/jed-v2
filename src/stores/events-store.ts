import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Event } from "@/interfaces";

// Types for all Events
type EventsActions = {
  setEvents: (events: Event[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

type EventsStore = {
  events: Event[];
  isLoading?: boolean;
};

type SingleEventActions = {
  setEvent: (event: Event) => void;
};

type SingleEventStore = {
  event: Event | null;
};

const initialEventsState: EventsStore = {
  events: [],
  isLoading: false,
};

const initialSingleEventState: SingleEventStore = {
  event: null,
};

const useEventsStore = create<EventsStore & EventsActions>()(
  persist(
    (set) => ({
      ...initialEventsState,
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
        set(() => ({
          isLoading,
        })),
    }),
    {
      name: "events-store",
    }
  )
);

const useSingleEventStore = create<SingleEventStore & SingleEventActions>()(
  persist(
    (set) => ({
      ...initialSingleEventState,
      setEvent: (event) =>
        set(() => ({
          event,
        })),
    }),
    {
      name: "single-event-store",
    }
  )
);

export default useEventsStore;
export { useSingleEventStore };
export type {
  EventsStore,
  EventsActions,
  SingleEventStore,
  SingleEventActions,
};
