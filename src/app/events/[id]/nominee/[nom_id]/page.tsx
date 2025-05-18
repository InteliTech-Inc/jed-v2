"use client";

import { Event, Nominee } from "@/interfaces";
import { useState } from "react";
import Image from "next/image";
import { ThumbsUp } from "lucide-react";
import BackButton from "@/components/back";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import eventsData from "../../../data.json";
import { useParams } from "next/navigation";
import ShareLink from "@/app/events/[id]/_components/share_link";
export default function NomineeVotingPage() {
  const { id: eventId, nom_id: nomineeId } = useParams();
  const [numberOfVotes, setNumberOfVotes] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const eventData = eventsData.find((e) => String(e.id) === eventId);
  if (!eventData) {
    return <div className="container mx-auto px-4 py-8">Event not found.</div>;
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

  const nominee = event.categoryDetails.flatMap((cat) => cat.nominees).find((nom) => nom.id === nomineeId);

  if (!nominee) {
    return <div className="container mx-auto px-4 py-8">Nominee not found.</div>;
  }

  const totalPrice = numberOfVotes * event.pricePerVote;

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
        <div className=" ml-2 md:ml-6 flex justify-between">
          <BackButton />
          <ShareLink code={nominee.code} />
        </div>
        <div className="grid md:grid-cols-2  gap-8 px-2 md:p-6">
          <div className="relative w-full h-[300px] sm:h-full overflow-hidden rounded-xl">
            <Image src={nominee.image} alt={nominee.name} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 50vw" />
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

              <p className="text-gray-600">Support your favorite nominee by casting your votes. You can also vote via USSD by dialing *928*121#</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" required />
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
                <Label htmlFor="votes">Number of Votes (GHS {event.pricePerVote.toFixed(2)})</Label>
                <Input id="votes" type="number" min={event.pricePerVote} value={numberOfVotes} onChange={handleVoteChange} required />
                <p className="text-sm text-gray-500">Total Price: GHS {totalPrice.toFixed(2)}</p>
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
