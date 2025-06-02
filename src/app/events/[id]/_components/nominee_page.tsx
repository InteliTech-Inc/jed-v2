"use client";

import { Nominee, VotingPayload } from "@/interfaces";
import Image from "next/image";
import BackButton from "@/components/back";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { Spinner } from "@/components/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema, votingFormSchema } from "@/validations/voting-form";
import { useParams, useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { formatJedError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/query-keys";
import useEventsStore from "@/stores/events-store";
import ShareLink from "./share_link";
export default function NomineeVotingPage() {
  const { id: event_id, nom_id: nominee_id } = useParams();
  const router = useRouter();
  const { voteNominee } = SERVER_FUNCTIONS;
  const { events } = useEventsStore();

  const eventData = events.find((event) => event.id === event_id);

  const event = {
    ...eventData,
    id: String(eventData?.id),
    approval_status: eventData?.approval_status,
    event_progress: eventData?.event_progress,
    categories: (eventData?.categories ?? []).map((category: any) => ({
      ...category,
      nominees: category.nominees.map((nominee: any) => ({
        id: nominee.id,
        name: nominee.full_name,
        fullName: nominee.full_name,
        category: category.name,
        image: nominee.media?.url,
        code: nominee.code,
      })),
    })),
  };

  const nominee = event.categories?.flatMap((cat: { nominees: Nominee }) => cat.nominees).find((nom: { id: string }) => nom.id === nominee_id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(votingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      numberOfVotes: 1,
    },
  });

  const numberOfVotes = watch("numberOfVotes") ?? 1;
  const totalPrice = numberOfVotes * (event.amount_per_vote ?? 0);

  const { mutateAsync: handleVoting, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.VOTING],
    mutationFn: async (payload: VotingPayload) => {
      const res = await voteNominee(payload);
      return res;
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(formatJedError(error));
      } else {
        toast.error("An error occurred while processing your request.");
      }
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      const votingPayload: VotingPayload = {
        email: data.email,
        full_name: data.name,
        amount_payable: totalPrice,
        count: data.numberOfVotes,
        nominee_id,
        event_id,
      };

      const response = await handleVoting(votingPayload);
      if (response.data) {
        toast.success("Your vote is being processed. Kindly complete the payment to finalize your vote.");
        router.push(response.data.authorization_url);
        reset();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(formatJedError(error));
      } else {
        toast.error("An error occurred while processing your request.");
      }
    }
  };

  if (!nominee) {
    return (
      <div className="flex container items-center justify-center">
        <Spinner />
      </div>
    );
  }

  switch (event.event_progress?.toLocaleLowerCase()) {
    case "not_started":
      return (
        <div className="flex container flex-col h-[30rem] items-center justify-center">
          <div className="text-center w-40 h-auto ">
            <Image src="/images/processing.svg" alt="Processing" width={200} height={200} className="mx-auto mb-6  h-full w-full object-contain" />
          </div>
          <h1 className="text-gray-700 text-xl font-medium">Voting for this event has not started yet.</h1>
          <p className="text-gray-500 text-sm mt-2">Please check back later when the event goes live.</p>
        </div>
      );
    case "hi":
      return (
        <div className="flex container flex-col h-[30rem] items-center justify-center">
          <div className="text-center w-40 h-auto ">
            <Image src="/images/completed.svg" alt="Processing" width={200} height={200} className="mx-auto mb-6  h-full w-full object-contain" />
          </div>
          <h1 className="text-gray-700 text-xl font-medium">Voting for this event has already been completed.</h1>
          <p className="text-gray-500 text-sm mt-2">Thank you for your interest, but the voting period has ended.</p>
        </div>
      );
    default:
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto md:mt-8">
            <div className="flex mb-3 justify-between items-center pr-2">
              <div className=" ml-2 md:ml-6">
                <BackButton />
              </div>
              <ShareLink code={nominee.code} />
            </div>
            <div className="grid md:grid-cols-2 gap-8 px-2 md:p-6">
              <div className="relative w-full h-[18rem] md:h-full overflow-hidden rounded-xl">
                <Image
                  src={nominee.image}
                  alt={nominee.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover object-top h-full w-full"
                  priority
                />
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-white">{nominee.name}</h2>
                    <p className="text-white/80">{nominee.category}</p>
                    <p className="text-accent">{nominee.code}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    Vote for {nominee.name} ({nominee.code})
                  </h1>
                  <p className="text-gray-600">
                    Support your favorite nominee by casting your votes. You can also vote via USSD by dialing <strong>*928*121#</strong>
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register("name")} placeholder="Enter your full name" />
                    {errors.name && <small className="text-sm text-red-500">{errors.name.message}</small>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="Enter your email address" />
                    {errors.email && <small className="text-sm text-red-500">{errors.email.message}</small>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="votes">Number of Votes (GHS {event.amount_per_vote?.toFixed(2)})</Label>
                    <Input
                      id="votes"
                      type="number"
                      {...register("numberOfVotes", { valueAsNumber: true })}
                      min={1}
                      onChange={(e) => setValue("numberOfVotes", parseInt(e.target.value))}
                    />
                    {errors.numberOfVotes && <small className="text-sm text-red-500">{errors.numberOfVotes.message}</small>}
                    <p className="text-sm text-gray-500">Total Price: GHS {totalPrice > 0 ? totalPrice.toFixed(2) : "0.00"}</p>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting || isPending}>
                    {isSubmitting || isPending ? <Spinner /> : " Submit Votes"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
