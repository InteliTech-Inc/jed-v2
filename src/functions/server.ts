import { VotingPayload } from "@/interfaces";
import { authAxios } from "@/lib/auth-axios";

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
};
