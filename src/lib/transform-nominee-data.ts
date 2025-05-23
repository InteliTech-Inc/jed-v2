import { SERVER_FUNCTIONS } from "@/functions/server";

interface NomineeDetails {
  eventName: string;
  nomineeName: string;
  category: string;
  pricePerVote: number;
  event_id: string;
  nominee_id: string;
}

interface NomineeResponse {
  id: string;
  full_name: string;
  code: string;
  catgeory: {
    name: string;
  };
  event_id: string;
  votes: Array<{ count: number }>;
  total_votes: number;
  media: { url: string };
}

export const transformNomineeData = async (
  data: NomineeResponse[]
): Promise<Record<string, NomineeDetails>> => {
  const eventPricePromises = data.map(async (nominee) => {
    const event = await singleEventPrice(nominee.event_id);
    return { code: nominee.code, price: event.amount, name: event.name };
  });

  const eventPrices = await Promise.all(eventPricePromises);

  const transformedData = data.reduce((acc, nominee) => {
    const nomineeEvent = eventPrices.find(
      (price) => price.code === nominee.code
    );
    if (nomineeEvent) {
      acc[nominee.code] = {
        eventName: nomineeEvent.name,
        nomineeName: nominee.full_name,
        category: nominee.catgeory.name,
        pricePerVote: Number(nomineeEvent.price),
        event_id: nominee.event_id,
        nominee_id: nominee.id,
      };
    }
    return acc;
  }, {} as Record<string, NomineeDetails>);

  return transformedData;
};

const singleEventPrice = async (
  id: string
): Promise<Record<string, string>> => {
  const res = await SERVER_FUNCTIONS.getEvent(id);
  return { amount: res.data.amount_per_vote, name: res.data.name };
};
