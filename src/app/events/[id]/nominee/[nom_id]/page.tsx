import { Metadata } from "next";
import NomineeVotingCard from "@/app/events/[id]/_components/nominee_page";
import eventsData from "../../../data.json";
import { Event } from "@/interfaces";

interface Props {
  params: {
    id: string;
    nom_id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const eventData = eventsData.find((e) => String(e.id) === params.id);

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

  const nominee = event.categoryDetails.flatMap((cat) => cat.nominees).find((nom) => nom.id === params.nom_id);

  if (!nominee) {
    return {
      title: "Nominee Not Found | JED",
      description: "The requested nominee could not be found.",
    };
  }

  return {
    title: `${nominee.name} - ${event.name} | JED Voting`,
    description: `Vote for ${nominee.name} as the ${nominee.category} in the ${event.name} event.`,
    keywords: `${nominee.name}, ${nominee.code}, ${event.name}, ${nominee.category}, voting, JED platform, online voting`,
    openGraph: {
      title: `${nominee.name} (${nominee.code}) | ${event.name} | JED Voting`,
      description: `Vote for ${nominee.name} as the ${nominee.category} in the ${event.name} event.`,
      type: "website",
      url: `${process.env.NEXT_PUBLIC_LIVE_URL}/events/${event.id}/nominee/${nominee.id}`,
      images: [
        {
          url: nominee.image,
          width: 1200,
          height: 630,
          alt: nominee.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${nominee.name} - ${event.name} | JED Voting`,
      description: `Vote for ${nominee.name} as the ${nominee.category} in the ${event.name} event.`,
      images: [nominee.image],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_LIVE_URL}/events/${event.id}/nominee/${nominee.id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function NomineePage({ params }: Props) {
  const { id, nom_id } = params;
  return <NomineeVotingCard eventId={id} nomineeId={nom_id} />;
}
