import { Skeleton } from "@/components/ui/skeleton";

function EventCardSkeleton() {
  return (
    <div className="group transition-all duration-300">
      <div className="relative h-80 w-full overflow-hidden rounded-lg mb-3">
        <div className="absolute top-2 right-2 z-10">
          <Skeleton className="size-4 rounded-full" />
        </div>
        <Skeleton className="h-full w-full" />
        <div className="">
          <Skeleton className="h-6 w-3/4 absolute bottom-2" />
          <div className="translate-y-10 flex items-center gap-2 absolute bottom-2">
            <Skeleton className="size-4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsSkeleton() {
  return (
    <div className="flex flex-col w-full gap-4 p-6 lg:p-10 mt-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <div className="w-full md:w-[25rem]">
            <div className="h-12 w-full rounded-full bg-muted animate-pulse" />
          </div>
          <div className="w-full sm:w-60">
            <div className="h-12 w-full rounded-full bg-muted animate-pulse" />
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <div className="h-12 w-full rounded-full bg-muted animate-pulse" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
