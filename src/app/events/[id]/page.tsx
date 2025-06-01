import { Metadata } from "next";
import { Event } from "@/interfaces";
import BackButton from "@/components/back";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { notFound } from "next/navigation";
import CategoriesList from "./_components/categories_list";
import SingleEvent from "./_components/single_event";

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
        totalVotes: nominee.votes.find((n: any) => n.nominee_id === nominee.id)?.count,
      })),
    })),
  };

  return {
    title: `Event - ${event.name}`,
    description: `${event.description} -  Join now to support your favorite nominees!`,
    keywords: `${event.name}, voting event, ${event.categories.map((cat) => cat.name).join(", ")}, online voting, JED platform`,
    openGraph: {
      title: `Event - ${event.name}`,
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
      title: `Event - ${event.name}`,
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, {
    next: { revalidate: 120 },
  });
  const { data: event } = await res.json();

  if (!event) {
    return notFound();
  }

  return (
    <div className=" bg-gradient-to-b from-accent/10 to-white">
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
          </article>
          <SingleEvent event={event} />
          <div className="mt-4 text-center max-w-screen-md mb-10 mx-auto ">
            <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
            <p className="text-gray-500">{event.description}</p>
          </div>
          <CategoriesList data={event} />{" "}
        </div>
      </main>
    </div>
  );
}
