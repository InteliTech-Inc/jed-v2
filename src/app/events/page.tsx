import React, { Suspense } from "react";
import { Metadata } from "next";
import Events from "./_components/events";
import BackButton from "@/components/back";
import EventsSkeleton from "./_components/event_skeleton";

export const metadata: Metadata = {
  title: "Events - Vote for Your Favorite Nominees",
  description:
    "Discover and participate in exciting voting events. Support your favorite nominees across various categories. Join JED's community-driven voting platform.",
  keywords: "voting events, nominee voting, event categories, JED voting platform, online voting, event participation",
  openGraph: {
    title: "Events - Vote for Your Favorite Nominees",
    description: "Discover and participate in exciting voting events. Support your favorite nominees across various categories.",
    type: "website",
    url: "https://jed-event.com/events",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_LIVE_URL}/src/app/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "JED Events Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events | JED - Vote for Your Favorite Nominees",
    description: "Discover and participate in exciting voting events. Support your favorite nominees across various categories.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_LIVE_URL}/src/app/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "JED Events Platform",
      },
    ],
  },
};

export default async function EventsPage() {
  return (
    <main className="bg-gradient-to-b from-accent/10 to-white">
      <div className="min-h-screen max-w-7xl mx-auto">
        <div className=" ml-6">
          <BackButton />
        </div>
        <section className="mt-12 px-4">
          <h1 className="text-3xl md:text-5xl text-center font-bold">All Events</h1>
          <p className="text-center text-lg mt-1 text-gray-600">Find all events and vote for your favorite nominees.</p>
        </section>
        <Suspense fallback={<EventsSkeleton />}>
          <Events />
        </Suspense>
      </div>
    </main>
  );
}
