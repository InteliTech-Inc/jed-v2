import Image from "next/image";
import AboutImage from "@/assets/images/group conf.jpeg";
import { Metadata } from "next";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ABOUT_SCHEMA } from "@/structured-data/about.schema";

export const metadata: Metadata = {
  title: "About Us | JED Event Management Platform",
  description:
    "Learn about JED's mission to provide intuitive, secure, and efficient event management solutions. Discover why we're different and how we're revolutionizing event organization.",
  keywords: ["about JED", "event management company", "event platform", "voting platform", "event solutions"],
  openGraph: {
    title: "About JED - Event Management Platform",
    description:
      "Learn about JED's mission to provide intuitive, secure, and efficient event management solutions. Discover why we're different and how we're revolutionizing event organization.",
    type: "website",
  },
  twitter: {
    title: "About JED - Event Management Platform",
    description:
      "Learn about JED's mission to provide intuitive, secure, and efficient event management solutions. Discover why we're different and how we're revolutionizing event organization.",
  },
};

const contactLines = [
  {
    title: "Phone",
    value: "0599774425 | 0538122885 | 0559237619",
    icon: "solar:phone-linear",
  },
  {
    title: "Email",
    value: "info.jedvotes@gmail.com",
    icon: "clarity:email-line",
  },
  {
    title: "Address",
    value: "Kumasi, Ghana",
    icon: "solar:map-arrow-square-linear",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <script type="application/ld+json" id="schema-about" dangerouslySetInnerHTML={{ __html: JSON.stringify(ABOUT_SCHEMA) }} aria-hidden="true" />
      <div className="mb-16">
        <section className="p-4 text-center mt-10 max-w-screen-md mx-auto" aria-labelledby="company-heading">
          <h3 id="company-heading" className="text-4xl lg:text-5xl text-neutral-800 py-4 font-semibold">
            Our Company
          </h3>
          <p>
            Our goal is to provide an intuitive, secure, and efficient experience for both event organizers and participants. We believe that everyone should
            have access to the tools they need to create successful events, and we're committed to making that a reality.
          </p>
        </section>
        <div className="lg:w-[90%] bg-[#f2f7e5] p-6 rounded-xl mx-auto border-2 mt-20 grid lg:grid-cols-2 gap-6 place-items-center">
          <section aria-labelledby="why-jed-heading">
            <h2 id="why-jed-heading" className="text-4xl py-4 font-semibold mb-6">
              Why JED?
            </h2>
            <article>
              <p className="leading-[1.6]">
                Traditional voting and event management platforms often come with a range of frustrating issues that make the process inefficient, slow and
                unreliable. Many platforms suffer from poor user interface(UI) and and user experience(UX) design. This results in a frustrating experience for
                event organizers and participants alike. Also, some platforms require you to contact the platform owners before you can even sign up, adding
                unnecessary steps and delays. Many platforms also charge high commissions for event management, which can be a significant burden on organizers.
              </p>
              <br />
              <p>
                Jed addresses all of these issues by offering a simple, intuitive, and secure platform. With Jed, you get a clean, user-friendly interface that
                makes navigation and usage easy. Sign-ups are quick and easy, with no need for contacting us before signing up or jumping through hoops. Our
                platform also provides full transparency of voting results in real-time. This fosters trust and ensures fairness throughout the process.
                Additionally, Jed offers competitive pricing without the expensive commissions that many other platforms charge, making it an affordable choice
                for event organizers. Jed is built with efficiency and performance in mind, ensuring that everything runs smoothly, even during high-traffic
                events, allowing you to focus on what matters most—creating successful events and delivering fast, accurate results.
              </p>
            </article>
          </section>
          <section className="rounded-md overflow-hidden h-full">
            <Image
              src={AboutImage}
              alt="Team collaboration meeting at JED"
              className="h-full object-cover object-center transition-transform ease-in duration-300 hover:scale-105"
              priority
            />
          </section>
        </div>
        <section className="p-4 text-center mt-20 max-w-6xl mx-auto" id="contact" aria-labelledby="contact-heading">
          <h3 id="contact-heading" className="text-4xl lg:text-5xl text-neutral-800 py-4 font-semibold">
            Contact Us
          </h3>
          <p>Ready to create your next event with JED? Contact us today to get started!</p>
          <div className="grid mt-12 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactLines.map((line) => (
              <div key={line.value} className="border rounded-lg p-4 w-full bg-[#f2f7e5]">
                <div className="rounded-lg flex items-center justify-center bg-white text-seconary h-28">
                  <Icon icon={line.icon} className="h-12 w-12 text-secondary" aria-hidden="true" />
                </div>
                <div className="py-4 flex flex-col gap-2">
                  <h6 className="text-xl font-semibold">{line.title}</h6>
                  <p>{line.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
