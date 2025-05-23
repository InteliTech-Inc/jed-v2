import { ParamValue } from "next/dist/server/request/params";

// Nominee type
export type Nominee = {
  id: string;
  name: string;
  fullName: string;
  category: string;
  media: Media;
  image: string;
  code: string;
  totalVotes: number;
};

// Category type
export type Category = {
  id: number;
  name: string;
  description: string;
  nominees: Nominee[];
};

// Period type
export type Period = {
  start: string; // ISO date string
  end: string; // ISO date string
};

export type Media = {
  url: string;
};

// Event type
export type Event = {
  id: string;
  name: string;
  description: string;
  media: Media;
  voting_period: Period;
  nomination_period: Period;
  approval_status: "pending" | "approved" | "declined";
  event_progress: "pending" | "ongoing" | "completed";
  is_published: boolean;
  display_results: boolean;
  amount_per_vote: number;
  categories: Category[];
};

export type EventResponse = {
  data: {
    events: Event[];
  };
};

// Full response type
export type EventListResponse = Event[];

export type VotingPayload = {
  email: string;
  full_name: string;
  amount_payable: number;
  count: number;
  nominee_id: ParamValue;
  event_id: ParamValue;
};
