import { ChatContainer } from "@/app/topboy/chat/_components/ChatContainer";

export default function ChatPage() {
  return (
    <div className="relative w-full p-4 py-8 ">
      <div className="absolute top-0 left-0 w-full h-[35rem] bg-gradient-to-b from-accent/20 via-accent/10 to-transparent z-0"></div>
      <div className="relative mt-8 z-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Meet Topboy 👋</h1>
        <p className="text-center mb-8 max-w-2xl mx-auto mt-2">
          Topboy is our system assistant. He will help you vote for your favorite nominees and buy tickets for your favorite events.
        </p>

        <div className=" mt-20">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
}
