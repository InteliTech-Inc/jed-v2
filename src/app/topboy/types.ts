export type MessageType = "user" | "system";

export interface ChatMessage {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

export type ChatAction = "vote" | "buy_ticket";

export interface VotingPayload {
  email?: string;
}

// Dummy data types for now
export interface NomineeDetails extends VotingPayload {
  eventName: string;
  nomineeName: string;
  category: string;
  pricePerVote: number;
  event_id: string;
  nominee_id: string;
}

export interface EventDetails {
  name: string;
  location: string;
  ticketPackages: TicketPackage[];
}

export interface TicketPackage {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ChatState {
  messages: ChatMessage[];
  currentAction: ChatAction | null;
  nomineeDetails: NomineeDetails | null;
  eventDetails: EventDetails | null;
  selectedTicketPackage: TicketPackage | null;
  numberOfVotes: number;
  retryCount: number;
  isInRetryMode: boolean;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  setCurrentAction: (action: ChatAction | null) => void;
  setNomineeDetails: (details: NomineeDetails | null) => void;
  setEventDetails: (details: EventDetails | null) => void;
  setSelectedTicketPackage: (pkg: TicketPackage | null) => void;
  setNumberOfVotes: (votes: number) => void;
  incrementRetryCount: () => void;
  resetRetryCount: () => void;
  setRetryMode: (mode: boolean) => void;
  reset: () => void;
}

// Dummy data
export const DUMMY_EVENTS: Record<string, EventDetails> = {
  EVT001: {
    name: "Tech Awards 2024",
    location: "Virtual Event",
    ticketPackages: [
      {
        id: "PKG1",
        name: "Standard Pass",
        price: 50,
        description: "Access to main event and networking",
      },
      {
        id: "PKG2",
        name: "VIP Pass",
        price: 150,
        description: "Premium access with exclusive networking",
      },
    ],
  },
};

export const DUMMY_NOMINEES: Record<string, NomineeDetails> = {
  NOM001: {
    eventName: "Tech Awards 2024",
    nomineeName: "John Doe",
    category: "Best Developer",
    pricePerVote: 2,
    event_id: "EVT001",
    nominee_id: "NOM001",
  },
  NOM002: {
    eventName: "Tech Awards 2024",
    nomineeName: "Jane Smith",
    category: "Best Designer",
    pricePerVote: 2,
    event_id: "EVT001",
    nominee_id: "NOM002",
  },
};
