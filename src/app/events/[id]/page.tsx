import { Metadata } from "next";
import { Event, Nominee } from "@/interfaces";
import NomineesGrid from "@/app/events/[id]/_components/nominees_grid";
import BackButton from "@/components/back";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data } = await SERVER_FUNCTIONS.getEvent(id);

  if (!data) {
    return {
      title: "Event Not Found | JED",
      description: "The requested event could not be found.",
    };
  }

  const event: Event = {
    ...data,
    id: String(data.id),
    approval_status: data.approval_status,
    event_progress: data.event_progress,
    categories: data.categories.map((category: any) => ({
      ...category,
      nominees: category.nominees.map((nominee: any) => ({
        id: nominee.id,
        name: nominee.fullName,
        fullName: nominee.fullName,
        category: category.name,
        image: nominee.image,
        code: nominee.code,
        totalVotes: nominee.votes.find((n: any) => n.nominee_id === nominee.id)
          ?.count,
      })),
    })),
  };

  return {
    title: `${event.name} | JED Event`,
    description: `${event.description} -  Join now to support your favorite nominees!`,
    keywords: `${event.name}, voting event, ${event.categories
      .map((cat) => cat.name)
      .join(", ")}, online voting, JED platform`,
    openGraph: {
      title: `${event.name} | JED Voting Event`,
      description: `${event.description} -  Join now to support your favorite nominees!`,
      type: "website",
      url: `https://jed-event.com/events/${event.id}`,
      images: [
        {
          url: event.media?.url,
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
      images: [event.media?.url],
    },
    alternates: {
      canonical: `https://jed-event.com/events/${event.id}`,
    },
  };
}

export default async function EventPage({ params }: Readonly<Props>) {
  const { id } = await params;

  const { data } = await SERVER_FUNCTIONS.getEvent(id);

  if (!data) {
    notFound();
  }

  const event = {
    ...data,
    id: String(data.id),
    approval_status: data.approval_status,
    event_progress: data.event_progress,
    voting_period: {
      start: data.schedule?.voting_start_period,
      end: data.schedule?.voting_end_period,
    },
    nomination_period: {
      start: data.schedule?.nomination_start_period,
      end: data.schedule?.nomination_end_period,
    },
  } as Event;

  const nominees: Nominee[] = data.categories.flatMap((cat: any) =>
    cat.nominees.map((nom: any) => {
      const totalVotes = nom.votes
        ?.filter((vote: any) => vote.nominee_id === nom.id)
        .reduce((sum: number, vote: any) => sum + vote.count, 0);
      return {
        id: nom.id,
        name: nom.full_name,
        fullName: nom.full_name,
        category: cat.name,
        image: nom.media?.url,
        code: nom.code,
        totalVotes,
      };
    })
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <BackButton />
      </div>
      <div className="max-w-7xl mx-auto">
        <article itemScope itemType="https://schema.org/Event">
          <meta itemProp="name" content={event.name} />
          <meta itemProp="description" content={event.description} />
          <meta itemProp="image" content={event.media?.url} />
          <meta itemProp="status" content={event.event_progress} />

          <NomineesGrid nominees={nominees} eventId={id} event={event} />
        </article>
      </div>
    </main>
  );
}
