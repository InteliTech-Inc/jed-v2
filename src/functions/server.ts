import { VotingPayload } from "@/interfaces";
import { authAxios } from "@/lib/auth-axios";
import { QUERY_KEYS } from "@/utils/query-keys";

export const SERVER_FUNCTIONS = {
  getEvents: async () => {
    const res = await authAxios.get("/events");
    return res.data;
  },
  getEvent: async (id: string) => {
    const res = await authAxios.get(`/events/${id}`);
    return res.data;
  },
  voteNominee: async (votingPayload: VotingPayload) => {
    const res = await authAxios.post("/voting", votingPayload);
    return res.data;
  },
  getNominees: async () => {
    const res = await authAxios.get("/nominee");
    return res.data;
  },
};

export const QUERY_OPTIONS = {
  EVENTS: {
    queryKey: [QUERY_KEYS.EVENTS],
    queryFn: SERVER_FUNCTIONS.getEvents,
    staleTime: 30 * 1000,
  },
  getSingleEvent: (id: string) => ({
    queryKey: [id],
    queryFn: () => SERVER_FUNCTIONS.getEvent(id),
    staleTime: 30 * 1000,
  }),
};
