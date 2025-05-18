"use client";

import { Event } from "@/interfaces";
import { useEffect, useState } from "react";
import Image from "next/image";
import BackButton from "@/components/back";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { Spinner } from "@/components/spinner";

export default function NomineeVotingPage() {
  const { id: eventId, nom_id: nomineeId } = useParams();
  const [numberOfVotes, setNumberOfVotes] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [eventData, setEventData] = useState<Event>();

  async function fetchEventData() {
    const id = String(eventId);
    const res = await SERVER_FUNCTIONS.getEvent(id);
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
        image: nominee.img_url,
        code: nominee.code,
        totalVotes: nominee.votes.find((n: any) => n.nominee_id === nominee.id)
          ?.count,
      })),
    })),
  } as Partial<Event>;

  const nominee = event.categories
    ?.flatMap((cat) => cat.nominees)
    .find((nom) => nom.id === nomineeId);

  if (!nominee) {
    return (
      <div className="flex container items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const totalPrice = numberOfVotes * event.amount_per_vote!;

  const handleVoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setNumberOfVotes(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement voting logic
    console.log({ ...formData, numberOfVotes, totalPrice });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto mt-8">
        <div className=" ml-2 md:ml-6">
          <BackButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 md:p-6">
          <div className="relative  w-full overflow-hidden rounded-xl">
            <Image
              src={nominee.image}
              alt={nominee.name}
              fill
              className="object-cover"
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
                also vote via USSD by dialing *928*121#
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="votes">
                  Number of Votes (GHS {event.amount_per_vote?.toFixed(2)})
                </Label>
                <Input
                  id="votes"
                  type="number"
                  min={event.amount_per_vote}
                  value={numberOfVotes}
                  onChange={handleVoteChange}
                  required
                />
                <p className="text-sm text-gray-500">
                  Total Price: GHS {totalPrice.toFixed(2)}
                </p>
              </div>
              <Button type="submit" className="w-full">
                Submit Votes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
