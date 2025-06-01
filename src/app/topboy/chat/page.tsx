import { Metadata } from "next";
import { ChatContainer } from "./_components/ChatContainer";

export const metadata: Metadata = {
  title: "Topboy Chat",
  description:
    "Chat with Topboy, your friendly assistant for voting and ticket purchases at JED events. Get help with voting for nominees or buying event tickets in a simple, conversational way.",
  keywords: ["JED", "Topboy", "chat", "voting", "tickets", "events", "assistant", "help"],
  openGraph: {
    title: "Topboy Chat",
    description:
      "Chat with Topboy, your friendly assistant for voting and ticket purchases at JED events. Get help with voting for nominees or buying event tickets in a simple, conversational way.",
    type: "website",
    locale: "en_US",
    siteName: "JED",
  },
  twitter: {
    card: "summary_large_image",
    title: "Topboy Chat",
    description:
      "Chat with Topboy, your friendly assistant for voting and ticket purchases at JED events. Get help with voting for nominees or buying event tickets in a simple, conversational way.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ChatPage() {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-accent/10 to-transparent -z-10" />

      <div className="container mx-auto px-4 py-8">
        <div className="mt-8 space-y-3">
          <h1 className="text-2xl md:text-5xl text-neutral-600 text-center font-bold">Meet Topboy 👋</h1>
          <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto">
            Topboy is our system assistant. He will help you vote for your favorite nominees and buy tickets for your favorite events.
          </p>
        </div>

        <div className="mt-12">
          <ChatContainer />
        </div>
      </div>
    </section>
  );
}
