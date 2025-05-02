import Nom from "@/assets/images/nom.png";
import Ticket from "@/assets/images/ticket.png";
import Vote from "@/assets/images/vote.png";
import Image from "next/image";
export default function WhatWeOffer() {
  return (
    <div className="max-w-7xl mx-auto mt-20">
      <section className=" max-w-screen-sm text-center mx-auto">
        <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold">What we offer</h1>
        <p className=" text-lg md:text-xl mt-6">
          Seamless online events organization and management features <span className="text-secondary/70">purposely built for you!</span>{" "}
        </p>
      </section>
      <section className=" mt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Nominations Card */}
              <div className="bg-gray-50  border-neutral-100 border rounded-xl  p-6 ">
                <div className="mb-6">
                  <Image src={Nom} alt="Nominations colored elements" className="w-full rounded-md" />
                </div>

                <h2 className="text-2xl font-medium text-green-500 mb-3">Nominations</h2>
                <p className="text-gray-700">
                  Manage nominations with our user-friendly platform. We have simplified the forms generation for you. Everything is organized, and you can
                  review and approve nominations without hassle.
                </p>
              </div>

              {/* Ticketing Card */}
              <div className="bg-gray-50  border-neutral-100 border rounded-xl  p-6 ">
                <div className="mb-6">
                  <Image src={Ticket} alt="Ticketing colored elements" className="w-full rounded-md" />
                </div>

                <h2 className="text-2xl font-medium text-green-500 mb-3">Ticketing</h2>
                <p className="text-gray-700">
                  Our platform makes it easy for event organizers and attendees to manage ticket purchases and registrations hassle-free.
                </p>
              </div>

              {/* Voting Card */}
              <div className="bg-gray-50  border-neutral-100 border rounded-xl p-6 ">
                <div className="mb-6">
                  <Image src={Vote} alt="Voting colored elements" className="w-full rounded-md" />
                </div>

                <h2 className="text-2xl font-medium text-green-500 mb-3">Voting</h2>
                <p className="text-gray-700">
                  Make voting quick, fair, and fun. Users can vote online or through USSD, and results update instantly. No confusion, no delays—just smooth and
                  secure voting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
