"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useChatStore } from "./store";
import { ChatInput } from "./ChatInput";
import { DUMMY_NOMINEES, ChatMessage as ChatMessageType, EventDetails, TicketPackage } from "../../types";
import { ChatMessage } from "./ChatMessage";
import { useTicketFlow } from "./TicketFlow";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ChatContainer = () => {
  const {
    messages,
    currentAction,
    nomineeDetails,
    eventDetails,
    selectedTicketPackage,
    numberOfVotes,
    addMessage,
    setCurrentAction,
    setNomineeDetails,
    setNumberOfVotes,
    reset,
  } = useChatStore();

  const { handleTicketFlow } = useTicketFlow();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === "system") {
      const container = document.documentElement;
      const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

      if (isAtBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      addMessage({
        type: "system",
        content: "Hey there! 👋 I'm Topboy, your friendly assistant from JED! Just type 'vote' or 'buy ticket' and we'll get started! 🎉",
      });
    }
  }, []);

  const addSystemMessage = async (content: string) => {
    await delay(800); // 800ms delay
    addMessage({
      type: "system",
      content,
    });
  };

  const handleMessage = async (content: string) => {
    addMessage({ type: "user", content });

    if (!currentAction) {
      await handleActionSelection(content.toLowerCase());
    } else if (currentAction === "vote") {
      await handleVotingFlow(content);
    } else if (currentAction === "buy_ticket") {
      await handleTicketFlow(content, eventDetails as EventDetails, selectedTicketPackage as TicketPackage);
    }
  };

  const handleActionSelection = async (content: string) => {
    if (content === "vote") {
      setCurrentAction("vote");
      await addSystemMessage("Awesome choice! 🎯 Just send the code of the nominee you'd like to vote for, and we'll continue from there!");
    } else if (content === "buy ticket") {
      setCurrentAction("buy_ticket");
      await addSystemMessage("Great! 🎟️ Just share the event code with me, and I'll show you all the amazing packages available! ✨");
    } else {
      await addSystemMessage("Oops! 😅 I didn't quite catch that. Could you type either 'vote' or 'buy ticket'?");
    }
  };

  const handleVotingFlow = async (content: string) => {
    if (!nomineeDetails) {
      const nominee = DUMMY_NOMINEES[content];
      if (nominee) {
        setNomineeDetails(nominee);
        await addSystemMessage(
          `I found ${nominee.nomineeName} in the ${nominee.category} category. Each vote is just GHS${nominee.pricePerVote} - how many votes would you like to cast?`
        );
      } else {
        await addSystemMessage(
          "Hmm, I couldn't find that nominee code. 🤔 Could you double-check and try again? I want to make sure your votes go to the right person! 🎯"
        );
      }
    } else if (!numberOfVotes) {
      const votes = parseInt(content);
      if (!isNaN(votes) && votes > 0) {
        setNumberOfVotes(votes);
        const total = votes * nomineeDetails.pricePerVote;
        await addSystemMessage(
          `Perfect! 🎉 That'll be GHS${total} for ${votes} amazing votes! Just type "confirm" to proceed with payment, or "cancel" if you'd like to start over. No pressure! 😊`
        );
      } else {
        await addSystemMessage("Oops! 🙈 I need a positive number for the votes. Could you try again?");
      }
    } else if (content.toLowerCase() === "confirm") {
      await addSystemMessage(
        "Woohoo! 🎊 Your votes are in! Thanks for being awesome and supporting your favorite nominee! Your payment will be processed shortly. You're making a difference! 🌟"
      );
      // reset();
    } else if (content.toLowerCase() === "cancel") {
      reset();
      await addSystemMessage(
        "No worries! 😊 Let's start fresh! Would you like to vote for a nominee or buy tickets? Just type 'vote' or 'buy ticket' and we'll get you sorted! 🎉"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-2 pb-4">
        <AnimatePresence mode="sync">
          {messages.map((message: ChatMessageType, index: number) => (
            <div key={message.id} ref={index === messages.length - 1 ? lastMessageRef : undefined}>
              <ChatMessage message={message} />
            </div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className="sticky bottom-0 py-4">
        <ChatInput onSend={handleMessage} />
      </div>
    </div>
  );
};
