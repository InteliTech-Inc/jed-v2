import { Event, Nominee } from "@/interfaces";
import NomineesGrid from "@/app/events/[id]/_components/nominees_grid";
import BackButton from "@/components/back";
import { SERVER_FUNCTIONS } from "@/functions/server";

type SingleEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SingleEventPage({
  params,
}: Readonly<SingleEventPageProps>) {
  const { id } = await params;

  const { data } = await SERVER_FUNCTIONS.getEvent(id);

  if (!data) {
    return <div className="container mx-auto px-4 py-8">Event not found.</div>;
  }

  const event = {
    ...data,
    id: String(data.id),
    approval_status: data.approval_status,
    event_progress: data.event_progress,
    voting_period: {
      start: data.schedule.voting_start_period,
      end: data.schedule.voting_end_period,
    },
    nomination_period: {
      start: data.schedule.nomination_start_period,
      end: data.schedule.nomination_end_period,
    },
  } as Event;

  const nominees: Nominee[] = data.categories.flatMap((cat: any) =>
    cat.nominees.map((nom: any) => ({
      id: nom.id,
      name: nom.full_name,
      fullName: nom.full_name,
      category: cat.name,
      image: nom.img_url,
      code: nom.code,
      totalVotes: nom.votes.find((n: any) => n.nominee_id === nom.id)?.count,
    }))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <div className="max-w-7xl mt-6 mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center">{event.name}</h1>
        <p className="text-gray-600 mb-8 text-center">{event.description}</p>
        <NomineesGrid nominees={nominees} eventId={id} event={event} />
      </div>
    </div>
  );
}
