"use client";

import { Event, VotingPayload } from "@/interfaces";
import { useEffect, useState } from "react";
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

export default function NomineeVotingPage({
  eventId,
  nomineeId,
}: Readonly<{
  eventId: string;
  nomineeId: string;
}>) {
  const [eventData, setEventData] = useState<Event>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id: event_id, nom_id: nominee_id } = useParams();
  const router = useRouter();
  const { getEvent, voteNominee } = SERVER_FUNCTIONS;
  async function fetchEventData() {
    const id = String(eventId);
    const res = await getEvent(id);
    return res.data;
  }

  useEffect(() => {
    fetchEventData().then((data) => {
      setEventData(data);
    });
  }, []);

  const event = {
    ...eventData,
    id: String(eventData?.id),
    approval_status: eventData?.approval_status,
    event_progress: eventData?.event_progress,
    categories: (eventData?.categories ?? []).map((category) => ({
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
    ?.flatMap((cat) => cat.nominees)
    .find((nom) => nom.id === nomineeId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);

    try {
      const votingPayload: VotingPayload = {
        email: data.email,
        full_name: data.name,
        amount_payable: totalPrice,
        count: data.numberOfVotes,
        nominee_id,
        event_id,
      };

      const response = await voteNominee(votingPayload);
      if (response.data) {
        toast.success(
          "Your vote is being processed. Kindly complete the payment to finalize your vote."
        );
        router.push(response.data.authorization_url);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(formatJedError(error));
      } else {
        toast.error("An error occurred while processing your request.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!nominee) {
    return (
      <div className="flex container items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto mt-8">
        <div className=" ml-2 md:ml-6">
          <BackButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 md:p-6">
          <div className="relative w-full overflow-hidden rounded-xl">
            <Image
              src={nominee.image}
              alt={nominee.name}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-white">
                  {nominee.name}
                </h2>
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
                Support your favorite nominee by casting your votes. You can
                also vote via USSD by dialing <strong>*928*121#</strong>
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <small className="text-sm text-red-500">
                    {errors.name.message}
                  </small>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <small className="text-sm text-red-500">
                    {errors.email.message}
                  </small>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="votes">
                  Number of Votes (GHS {event.amount_per_vote?.toFixed(2)})
                </Label>
                <Input
                  id="votes"
                  type="number"
                  {...register("numberOfVotes", { valueAsNumber: true })}
                  min={1}
                  onChange={(e) =>
                    setValue("numberOfVotes", parseInt(e.target.value))
                  }
                />
                {errors.numberOfVotes && (
                  <small className="text-sm text-red-500">
                    {errors.numberOfVotes.message}
                  </small>
                )}
                <p className="text-sm text-gray-500">
                  Total Price: GHS {totalPrice.toFixed(2)}
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : " Submit Votes"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
