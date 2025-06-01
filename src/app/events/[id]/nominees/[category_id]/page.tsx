"use client";

import { useParams } from "next/navigation";
import { useSingleEventStore } from "@/stores/events-store";
import NomineesGrid from "../../_components/nominees_grid";
import { Nominee } from "@/interfaces";
import { useQuery } from "@tanstack/react-query";
import { QUERY_OPTIONS } from "@/functions/server";
import { useMemo } from "react";

export default function NomineesPage() {
  const { id, category_id } = useParams();
  const { event } = useSingleEventStore();

  const isStoredEvent = event?.id === id;

  const { data, isLoading } = useQuery({
    ...QUERY_OPTIONS.getSingleEvent(id as string),
    enabled: !isStoredEvent,
  });

  const actualEvent = isStoredEvent ? event : data?.data;

  const category = useMemo(() => {
    if (!actualEvent) return null;
    return actualEvent.categories.find((cat: any) => cat.id === category_id);
  }, [actualEvent, category_id]);

  const nominees: Nominee[] = useMemo(() => {
    if (!actualEvent) return [];
    return actualEvent.categories
      .filter((cat: any) => cat.id === category_id)
      .flatMap((cat: any) =>
        cat.nominees.map((nom: any) => {
          const totalVotes = nom.votes?.filter((vote: any) => vote.nominee_id === nom.id).reduce((sum: number, vote: any) => sum + vote.count, 0) || 0;

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
  }, [actualEvent, category_id]);

  if (isLoading || !actualEvent) {
    return <div className="text-center text-muted animate-pulse">Loading event...</div>;
  }

  return <NomineesGrid nominees={nominees} event={actualEvent} category={category} />;
}
