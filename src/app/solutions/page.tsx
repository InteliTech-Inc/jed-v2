import Image from "next/image";
import NominationsImage from "@/assets/images/nom.png";
import VotingImage from "@/assets/images/vote.png";
import TicketingImage from "@/assets/images/ticket.png";
import { Metadata } from "next";
import BackButton from "@/components/back";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Discover JED's comprehensive event management solutions including nominations, voting, and ticketing systems. Streamline your event planning with our easy-to-use tools.",
  keywords: ["event solutions", "event nominations", "online voting", "event ticketing", "event management tools"],
  openGraph: {
    title: "JED Solutions - Event Management Platform",
    description:
      "Discover JED's comprehensive event management solutions including nominations, voting, and ticketing systems. Streamline your event planning with our easy-to-use tools.",
    type: "website",
  },
  twitter: {
    title: "JED Solutions - Event Management Platform",
    description:
      "Discover JED's comprehensive event management solutions including nominations, voting, and ticketing systems. Streamline your event planning with our easy-to-use tools.",
  },
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="ml-6">
          <BackButton />
        </div>
        <section className="p-5 sm:p-6" aria-labelledby="solutions-heading">
          <h1 id="solutions-heading" className="py-4 text-4xl md:text-5xl lg:text-6xl font-bold text-secondary">
            Solutions
          </h1>
          <p className="text-lg lg:w-3/5 lg:text-2xl leading-[1.4]">
            Our tools help you make the process of voting, nominations, and ticketing much simpler, making it easier to manage your events. With our easy-to-use
            tools, you can improve your planning and make every event <mark className="text-primary/60">memorable</mark>.
          </p>
        </section>
        <section
          id="nominations"
          className="grid lg:h-screen max-h-[550px] lg:grid-cols-2 gap-4 place-content-center p-5 sm:p-6"
          aria-labelledby="nominations-heading"
        >
          <section className="lg:p-4">
            <h2 id="nominations-heading" className="text-2xl lg:text-5xl text-secondary font-semibold py-4">
              Nominations
            </h2>
            <p className=" text-pretty">
              With Jed's nominations feature, event creators can easily send out nomination forms by sharing an internallly generated link. This makes it simple
              for participants to nominate their choices for awards, positions, or recognitions, anytime and from anywhere. The nomination results can be
              accessed and exported on the admin's dashboard. With this feature, there's no need to manually collect nominations through google forms. This
              streamlined process saves time and ensures that nominations are collected fairly and in an organized way.
              <br />
              <br />
              We've made it possible for event creators to choose not to use our built-in nominations feature. If they prefer, they can use a third-party
              platform to manage their nominations instead. They can import the final results and use Jed to manage the voting process. This gives event
              organizers the freedom to choose the method that works best for them and makes the early stages of event planning more flexible and efficient.
            </p>
          </section>
          <section className="">
            <div className="border rounded-3xl h-full p-4 grid place-content-center bg-neutral-50">
              <Image src={NominationsImage} alt="JED Nominations Platform Interface" className="w-full h-auto" priority />
            </div>
          </section>
        </section>
        <section
          id="voting"
          className="grid max-h-[550px] max-w-7xl mx-auto rounded-lg lg:h-screen lg:grid-cols-2 bg-accent/70 gap-4 place-content-center p-5 sm:p-6"
          aria-labelledby="voting-heading"
        >
          <section className="lg:p-4">
            <h2 id="voting-heading" className="text-2xl lg:text-5xl text-secondary font-semibold py-4">
              Voting
            </h2>
            <p className=" text-pretty">
              Jed's voting tool offers a secure, trustworthy, and efficient solution for managing and monitoring the entire voting process. It provides options
              for voting through the app online or using a USSD code to vote offline, this solution provides flexibility and makes voting accessible to a wider
              audience.
            </p>
            <br />
            <p className=" text-pretty">
              Event creators can track voting patterns and see how many people are participating in real-time, which provides transparency and helps improve the
              voting process. With detailed participation insights, Jed's voting system ensures a smooth, fair, and timely voting experience. This helps deliver
              quick results while maintaining high standards of security and integrity.
            </p>
          </section>
          <section>
            <div className="border rounded-3xl h-full p-4 grid place-content-center bg-neutral-50">
              <Image src={VotingImage} alt="JED Voting Platform Interface" className="w-full h-auto" priority />
            </div>
          </section>
        </section>
        <section
          id="ticketing"
          className="grid max-h-[550px] max-w-7xl mx-auto rounded-lg lg:h-screen lg:grid-cols-2 gap-4 place-content-center p-5 sm:p-6"
          aria-labelledby="ticketing-heading"
        >
          <section>
            <div className="border rounded-3xl h-full p-4 grid place-content-center bg-neutral-50">
              <Image src={TicketingImage} alt="JED Ticketing Platform Interface" className="w-full h-auto" priority />
            </div>
          </section>
          <section className="lg:p-4">
            <h2 id="ticketing-heading" className="text-2xl lg:text-5xl text-secondary font-semibold py-4">
              Ticketing
            </h2>
            <p className=" text-pretty">
              Jed's ticketing system aims to make buying tickets for events easier for everyone. Event creators can set ticket prices, create and manage
              different types of tickets, and track sales as they happen. This helps ensure that the entire ticketing process runs smoothly.
            </p>
            <br />
            <p className=" text-pretty">
              Using Jed for ticketing means event organizers can focus on other important tasks because they know ticket sales will be handled efficiently. This
              tool helps improve the experience for both event organizers and guests, making sure that the event runs without a hitch and maximizes attendance.
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}
