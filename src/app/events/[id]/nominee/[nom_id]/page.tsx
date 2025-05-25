import { Metadata } from "next";
import NomineeVotingCard from "@/app/events/[id]/_components/nominee_page";
import { Event } from "@/interfaces";
import { SERVER_FUNCTIONS } from "@/functions/server";

interface Props {
  params: Promise<{
    id: string;
    nom_id: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, nom_id } = await params;
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
        name: nominee.full_name,
        fullName: nominee.full_name,
        category: category.name,
        image: nominee.media?.url,
        code: nominee.code,
        totalVotes: nominee.votes.find((n: any) => n.nominee_id === nominee.id)
          ?.count,
      })),
    })),
  };

  const nominee = event.categories
    .flatMap((cat) => cat.nominees)
    .find((nom) => nom.id === nom_id);

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
          url: nominee.media?.url,
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
      images: [nominee.media?.url],
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

export default async function NomineePage() {
  return <NomineeVotingCard />;
}
