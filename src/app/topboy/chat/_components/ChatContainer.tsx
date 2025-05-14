"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useChatStore } from "./store";
import { ChatInput } from "./ChatInput";
import { DUMMY_NOMINEES, ChatMessage as ChatMessageType, EventDetails, TicketPackage } from "../../types";
import { ChatMessage } from "./ChatMessage";
import { useTicketFlow } from "./TicketFlow";
import { sanitizeChatResponse } from "@/lib/utils";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const ChatContainer = () => {
  const {
    messages,
    currentAction,
    nomineeDetails,
    eventDetails,
    selectedTicketPackage,
    numberOfVotes,
    retryCount,
    isInRetryMode,
    addMessage,
    setCurrentAction,
    setNomineeDetails,
    setNumberOfVotes,
    incrementRetryCount,
    resetRetryCount,
    setRetryMode,
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
        content:
          "Hey there! 👋 I'm Topboy, your friendly assistant from JED! What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\n\nJust type the number (1 or 2) to get started!",
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

  const handleIncorrectResponse = async () => {
    incrementRetryCount();
    if (retryCount >= 1) {
      setRetryMode(true);
      await addSystemMessage(
        "I notice you're having some trouble. Would you like to:\n1. Continue with current flow\n2. Start over\nPlease type 1 or 2 to proceed."
      );
    }
  };

  const handleVotingFlow = async (content: string) => {
    if (!nomineeDetails) {
      const nominee = DUMMY_NOMINEES[content];
      if (nominee) {
        setNomineeDetails(nominee);
        resetRetryCount();
        await addSystemMessage(
          `I found ${nominee.nomineeName} in the ${nominee.category} category. Each vote is just GHS${nominee.pricePerVote} - how many votes would you like to cast?`
        );
      } else {
        await handleIncorrectResponse();
        await addSystemMessage(
          "Hmm, I couldn't find that nominee code. 🤔 Could you double-check and try again? I want to make sure your votes go to the right person! 🎯"
        );
      }
    } else if (!numberOfVotes) {
      const votes = parseInt(content);
      if (!isNaN(votes) && votes > 0) {
        setNumberOfVotes(votes);
        resetRetryCount();
        const total = votes * nomineeDetails.pricePerVote;
        await addSystemMessage(
          `Perfect! 🎉 That'll be GHS${total} for ${votes} amazing votes! Just type "confirm" to proceed with payment, or "cancel" if you'd like to start over. No pressure! 😊`
        );
      } else {
        await handleIncorrectResponse();
        await addSystemMessage("Oops! 🙈 I need a positive number for the votes. Could you try again?");
      }
    } else if (content.toLowerCase() === "confirm") {
      await addSystemMessage(
        "Woohoo! 🎊 Your votes are in! Thanks for being awesome and supporting your favorite nominee! Your payment will be processed shortly. You're making a difference! 🌟"
      );
      reset();
    } else if (content.toLowerCase() === "cancel") {
      reset();
      await addSystemMessage(
        "Alright! Let's start fresh! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉"
      );
    }
  };

  const handleMessage = async (content: string) => {
    addMessage({ type: "user", content });
    const lowerContent = content.toLowerCase();

    // If in retry mode, only accept 1 or 2 as valid responses
    if (isInRetryMode) {
      if (lowerContent === "1") {
        resetRetryCount();
        if (currentAction === "vote") {
          if (!nomineeDetails) {
            await addSystemMessage("Alright! Let's continue. Please send the nominee code you'd like to vote for.");
          } else if (!numberOfVotes) {
            await addSystemMessage("Great! How many votes would you like to cast?");
          }
        } else if (currentAction === "buy_ticket") {
          if (!eventDetails) {
            await addSystemMessage("No problem! Please share the event code you're interested in.");
          } else if (!selectedTicketPackage) {
            const packages = eventDetails.ticketPackages.map((pkg, index) => `${index + 1}. ${pkg.name} - GHS${pkg.price} (${pkg.description})`).join("\n");
            await addSystemMessage(`Here are the packages again:\n${packages}\nWhich package would you like?`);
          }
        }
        return;
      } else if (lowerContent === "2") {
        reset();
        await addSystemMessage(
          "Alright! Let's start fresh! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉"
        );
        return;
      } else {
        await addSystemMessage("Please type 1 to continue with the current flow or 2 to start over.");
        return;
      }
    }

    // Handle retry count response
    if (messages[messages.length - 1]?.content.includes("Would you like to:")) {
      if (lowerContent === "1") {
        resetRetryCount();
        if (currentAction === "vote") {
          await addSystemMessage("Alright! Let's try again. Please send the nominee code you'd like to vote for.");
        } else if (currentAction === "buy_ticket") {
          await addSystemMessage("No problem! Let's try again. Please share the event code you're interested in.");
        }
        return;
      } else if (lowerContent === "2") {
        reset();
        await addSystemMessage(
          "Alright! Let's start fresh! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉"
        );
        return;
      }
    }

    // Smart detection for cancel in any message
    if (lowerContent.includes("cancel")) {
      if (currentAction) {
        await addSystemMessage(
          "I noticed you mentioned 'cancel'. Would you like to start over? Just type 'yes' to confirm or 'no' to continue what you were doing."
        );
        return;
      }
    }

    // Smart detection for vote during ticket flow
    if (currentAction === "buy_ticket" && lowerContent.includes("vote")) {
      await addSystemMessage(
        "I noticed you mentioned 'vote'. Would you like to switch to voting instead? Just type 'yes' to switch to voting or 'no' to continue with ticket purchase."
      );
      return;
    }

    // Handle confirmation responses
    if (messages[messages.length - 1]?.content.includes("Would you like to")) {
      if (lowerContent === "yes") {
        if (messages[messages.length - 1]?.content.includes("switch to voting")) {
          reset();
          setCurrentAction("vote");
          await addSystemMessage("Great! Let's switch to voting! 🎯 Just send the code of the nominee you'd like to vote for.");
        } else {
          reset();
          await addSystemMessage(
            "Alright! Let's start fresh! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉"
          );
        }
        return;
      } else if (lowerContent === "no") {
        if (currentAction === "buy_ticket") {
          await addSystemMessage("No problem! Let's continue with your ticket purchase. What would you like to do next?");
        } else if (currentAction === "vote") {
          await addSystemMessage("Alright! Let's continue with voting. What would you like to do next?");
        }
        return;
      }
    }

    if (!currentAction) {
      if (["1", "vote"].includes(lowerContent.trim().replaceAll(".", ""))) {
        setCurrentAction("vote");
        resetRetryCount();
        await addSystemMessage("Awesome choice! 🎯 Just send the code of the nominee you'd like to vote for, and we'll continue from there!");
      } else if (["2", "buy ticket", "buy tickets"].includes(lowerContent.trim().replaceAll(".", ""))) {
        setCurrentAction("buy_ticket");
        resetRetryCount();
        await addSystemMessage("Great! 🎟️ Just share the event code with me, and I'll show you all the amazing packages available! ✨");
      } else {
        await handleIncorrectResponse();
        await addSystemMessage("Hey! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉");
      }
    } else if (currentAction === "vote") {
      await handleVotingFlow(content);
    } else if (currentAction === "buy_ticket") {
      await handleTicketFlow(content, eventDetails as EventDetails, selectedTicketPackage as TicketPackage);
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
