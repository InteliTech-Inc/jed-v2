// Nominee type
export type Nominee = {
  id: string;
  name: string;
  fullName: string;
  category: string;
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

// Event type
export type Event = {
  id: string;
  name: string;
  description: string;
  img_url: string;
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
