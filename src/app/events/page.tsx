import React, { Suspense } from "react";
import { Metadata } from "next";
import { Spinner } from "@/components/spinner";
import Events from "./_components/events";
import BackButton from "@/components/back";
export const metadata: Metadata = {
  title: "Events",
  description: "Find all ongoing events and vote for preferred nominee",
};

export default async function EventsPage() {
  return (
    <main className="min-h-screen">
      <section className="mt-8 px-4">
        <BackButton />
        <h1 className="text-3xl md:text-5xl text-center font-bold">All Events</h1>
        <p className="text-center text-lg mt-1 text-gray-600">Find all events and vote for your favorite nominees.</p>
      </section>
      <Suspense fallback={<Spinner />}>
        <Events />
      </Suspense>
    </main>
  );
}
