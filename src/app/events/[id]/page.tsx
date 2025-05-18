import { Metadata } from "next";
import { Event, Nominee } from "@/interfaces";
import NomineesGrid from "@/app/events/[id]/_components/nominees_grid";
import eventsData from "../data.json";
import BackButton from "@/components/back";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const eventData = eventsData.find((e) => String(e.id) === id);

  if (!eventData) {
    return {
      title: "Event Not Found | JED",
      description: "The requested event could not be found.",
    };
  }

  const event: Event = {
    ...eventData,
    id: String(eventData.id),
    approvalStatus: eventData.approvalStatus as "pending" | "approved" | "declined",
    eventProgress: eventData.eventProgress as "not started" | "ongoing" | "completed",
    categoryDetails: eventData.categoryDetails.map((category) => ({
      ...category,
      nominees: category.nominees.map((nominee) => ({
        id: nominee.id,
        name: nominee.fullName,
        fullName: nominee.fullName,
        category: category.name,
        image: nominee.image,
        code: nominee.code,
        totalVotes: nominee.totalVotes,
      })),
    })),
  };

  return {
    title: `${event.name} | JED Event`,
    description: `${event.description} -  Join now to support your favorite nominees!`,
    keywords: `${event.name}, voting event, ${event.categoryDetails.map((cat) => cat.name).join(", ")}, online voting, JED platform`,
    openGraph: {
      title: `${event.name} | JED Voting Event`,
      description: `${event.description} -  Join now to support your favorite nominees!`,
      type: "website",
      url: `https://jed-event.com/events/${event.id}`,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${event.name} | JED Event`,
      description: `${event.description} -  Join now to support your favorite nominees!`,
      images: [event.image],
    },
    alternates: {
      canonical: `https://jed-event.com/events/${event.id}`,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const eventData = eventsData.find((e) => String(e.id) === id);

  if (!eventData) {
    notFound();
  }

  const event: Event = {
    ...eventData,
    id: String(eventData.id),
    approvalStatus: eventData.approvalStatus as "pending" | "approved" | "declined",
    eventProgress: eventData.eventProgress as "not started" | "ongoing" | "completed",
    categoryDetails: eventData.categoryDetails.map((category) => ({
      ...category,
      nominees: category.nominees.map((nominee) => ({
        id: nominee.id,
        name: nominee.fullName,
        fullName: nominee.fullName,
        category: category.name,
        image: nominee.image,
        code: nominee.code,
        totalVotes: nominee.totalVotes,
      })),
    })),
  };

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
    <main className="container mx-auto px-4 py-8">
      <BackButton />
      <div className="max-w-7xl mx-auto">
        <article itemScope itemType="https://schema.org/Event">
          <meta itemProp="name" content={event.name} />
          <meta itemProp="description" content={event.description} />
          <meta itemProp="image" content={event.image} />
          <meta itemProp="status" content={event.eventProgress} />

          <NomineesGrid nominees={nominees} eventId={id} event={event} />
        </article>
      </div>
    </main>
  );
}
