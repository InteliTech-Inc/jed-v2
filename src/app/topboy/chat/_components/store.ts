import { create } from "zustand";
import { ChatState } from "../../types";
import { v4 as uuidv4 } from "uuid";

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  currentAction: null,
  nomineeDetails: null,
  eventDetails: null,
  selectedTicketPackage: null,
  numberOfVotes: 0,
  retryCount: 0,
  isInRetryMode: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: uuidv4(),
          timestamp: new Date(),
        },
      ],
    })),

  setCurrentAction: (action) => set({ currentAction: action }),
  setNomineeDetails: (details) => set({ nomineeDetails: details }),
  setEventDetails: (details) => set({ eventDetails: details }),
  setSelectedTicketPackage: (pkg) => set({ selectedTicketPackage: pkg }),
  setNumberOfVotes: (votes) => set({ numberOfVotes: votes }),
  incrementRetryCount: () => set((state) => ({ retryCount: state.retryCount + 1 })),
  resetRetryCount: () => set({ retryCount: 0, isInRetryMode: false }),
  setRetryMode: (mode: boolean) => set({ isInRetryMode: mode }),

  reset: () =>
    set({
      messages: [],
      currentAction: null,
      nomineeDetails: null,
      eventDetails: null,
      selectedTicketPackage: null,
      numberOfVotes: 0,
      retryCount: 0,
      isInRetryMode: false,
    }),
}));
