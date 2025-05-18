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
  nominees: {
    id: string;
    fullName: string;
    image: string;
    code: string;
    totalVotes: number;
  }[];
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
  image: string;
  voting_period: Period;
  nomination_period: Period;
  approvalStatus: "pending" | "approved" | "declined";
  eventProgress: "not started" | "ongoing" | "completed";
  categories: number;
  isPublished: boolean;
  displayResults: boolean;
  categoryDetails: Category[];
};

// Full response type
export type EventListResponse = Event[];
