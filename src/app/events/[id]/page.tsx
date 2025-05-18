import { Event, Nominee } from "@/interfaces";
import NomineesGrid from "@/app/events/[id]/_components/nominees_grid";
import eventsData from "../data.json";
import BackButton from "@/components/back";
type SingleEventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function SingleEventPage({ params }: SingleEventPageProps) {
  const { id } = await params;
  const eventData = eventsData.find((e) => String(e.id) === id);

  if (!eventData) {
    return <div className="container mx-auto px-4 py-8">Event not found.</div>;
  }

  const event = {
    ...eventData,
    id: String(eventData.id),
    approvalStatus: eventData.approvalStatus as "pending" | "approved" | "declined",
    eventProgress: eventData.eventProgress as "not started" | "ongoing" | "completed",
  } as Event;

  const nominees: Nominee[] = event.categoryDetails.flatMap((cat) =>
    cat.nominees.map((nom) => ({
      id: nom.id,
      name: nom.fullName,
      fullName: nom.fullName,
      category: cat.name,
      image: nom.image,
      code: nom.code,
      totalVotes: nom.totalVotes,
    }))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center">{event.name}</h1>
        <p className="text-gray-600 mb-8 text-center">{event.description}</p>
        <NomineesGrid nominees={nominees} eventId={id} event={event} />
      </div>
    </div>
  );
}
