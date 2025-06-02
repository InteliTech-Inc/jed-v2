"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useChatStore } from "./store";
import { ChatInput } from "./ChatInput";
import {
  ChatMessage as ChatMessageType,
  EventDetails,
  TicketPackage,
} from "../../types";
import { ChatMessage } from "./ChatMessage";
import { useTicketFlow } from "./TicketFlow";
import { formatJedError } from "@/lib/utils";
import { SERVER_FUNCTIONS } from "@/functions/server";
import { VotingPayload } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/query-keys";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Loader, ZapIcon } from "lucide-react";
import { validateEmail } from "@/utils/validate-email";
import useNomineeStore from "@/stores/nominee-store";
import useEventsStore from "@/stores/events-store";
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
  const [votingData, setVotingData] = useState<VotingPayload | null>(null);

  const router = useRouter();
  const { voteNominee } = SERVER_FUNCTIONS;
  const { nominees } = useNomineeStore();
  const { events } = useEventsStore();

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.type === "system") {
      const container = document.documentElement;
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;

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

  useEffect(() => {
    const payload: VotingPayload = {
      email: nomineeDetails?.email!,
      full_name: "Topboy Chat (JED)",
      amount_payable: numberOfVotes * nomineeDetails?.pricePerVote!,
      event_id: nomineeDetails?.event_id!,
      nominee_id: nomineeDetails?.nominee_id!,
      count: numberOfVotes,
    };
    setVotingData(payload);
  }, [nomineeDetails, numberOfVotes]);

  const { mutateAsync: triggerTopboyOnVoting, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.VOTING],
    mutationFn: async (payload: VotingPayload) => {
      const res = await voteNominee(payload);
      return res;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(formatJedError(error));
      } else {
        toast.error("An error occurred while processing your request.");
      }
    },
  });

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
      const nominee = nominees[content.trim().toLocaleUpperCase()];

      if (!nominee) {
        await handleIncorrectResponse();
        await addSystemMessage(
          "Hmm, I couldn't find that nominee code. 🤔 Could you double-check and try again? I want to make sure your votes go to the right person! 🎯"
        );
        return;
      }

      const event = events.find((event) => event.id === nominee.event_id);

      if (!event?.is_published) {
        await addSystemMessage(
          "Oops! It seems like the event is not published yet. Please check back later or contact support for more information."
        );
        return;
      }

      if (event?.event_progress.toLocaleLowerCase() === "not_started") {
        await addSystemMessage(
          "Patience, folks! 🛑. Voting will begin soon. But not now. Definitely not now."
        );
        return;
      } else if (event?.event_progress.toLocaleLowerCase() === "completed") {
        await addSystemMessage(
          "Voting is over! The ballots are packed, sealed, and probably chilling somewhere in the other part of our world 🌍."
        );
        return;
      }

      if (nominee) {
        setNomineeDetails(nominee);
        resetRetryCount();
        await addSystemMessage(
          `I found <strong>${nominee.nomineeName}</strong> in the <strong>${
            nominee.category
          }</strong> category. Each vote is just <strong>GHS ${nominee.pricePerVote.toFixed(
            2
          )}</strong> for the event <strong>${
            nominee.eventName
          }</strong>. How many votes would you like to cast?`
        );
      }
    } else if (!numberOfVotes) {
      const votes = parseInt(content);
      if (!isNaN(votes) && votes > 0) {
        setNumberOfVotes(votes);
        resetRetryCount();
        const total = votes * nomineeDetails.pricePerVote;
        await addSystemMessage(
          `Perfect! 🎉 That'll be <strong>GHS ${total.toFixed(
            2
          )}</strong> for <strong>${votes}</strong> amazing votes!\nNow, please provide your valid email address to proceed with payment and receive a receipt. 📧`
        );
      } else {
        await handleIncorrectResponse();
        await addSystemMessage(
          "Oops! 🙈 I need a positive number for the votes. Could you try again?"
        );
      }
    } else if (!votingData?.email) {
      const votersEmail = content.trim().toLowerCase();
      const isValidEmail = validateEmail(votersEmail);
      if (isValidEmail) {
        setVotingData((prevData) =>
          prevData
            ? {
                ...prevData,
                email: votersEmail,
                full_name: "Topboy Chat (JED)",
                amount_payable: prevData.amount_payable,
                event_id: prevData.event_id,
                nominee_id: prevData.nominee_id,
                count: prevData.count,
              }
            : null
        );
        await addSystemMessage(
          `Got it! 📧 You've provided your email as <strong>${votersEmail}</strong>. Here's a summary of your vote:\n\nNominee: <strong>${
            nomineeDetails.nomineeName
          }</strong>\nVotes: <strong>${numberOfVotes}</strong>\nTotal: <strong>GHS ${(
            numberOfVotes * nomineeDetails.pricePerVote
          ).toFixed(
            2
          )}</strong>\n\nWould you like to confirm to proceed with payment or cancel?\n1. Confirm to proceed with payment\n2. Cancel\nJust type (1 or 2) to continue. 😊`
        );
      } else {
        await addSystemMessage(
          "Your email address seems invalid. Please enter a valid email address to proceed with payment and receive a receipt. 📧"
        );
        await handleIncorrectResponse();
        return;
      }
    } else if (content.toLowerCase() === "1") {
      await addSystemMessage(
        "Woohoo! 🎊 Your votes are in! Thanks for being awesome and supporting your favorite nominee! Your payment will be processed shortly. You're making a difference! 🌟"
      );
      const res = await triggerTopboyOnVoting(votingData);
      if (res.data) {
        router.push(res.data.authorization_url);
        reset();
      }
    } else if (content.toLowerCase() === "2") {
      reset();
      await addSystemMessage(
        "Alright! Let's start fresh! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉"
      );
    } else {
      await addSystemMessage(
        "Please type 1 to continue with the current flow or 2 to start over."
      );
      return;
    }
  };

  const handleMessage = async (content: string) => {
    addMessage({ type: "user", content });
    const lowerContent = content.toLowerCase();

    // If in retry mode, only accept 1 or 2 as valid responses
    if (isInRetryMode) {
      if (lowerContent === "1") {
        resetRetryCount();
        setRetryMode(false);
        if (currentAction === "vote") {
          if (!nomineeDetails) {
            await addSystemMessage(
              "Alright! Let's continue. Please send the nominee code you'd like to vote for."
            );
          } else if (!numberOfVotes) {
            await addSystemMessage(
              "Great! How many votes would you like to cast?"
            );
          } else {
            await addSystemMessage(
              "Let's try again. Please provide a valid email address to proceed with payment and receive a receipt. 📧"
            );
          }
        } else if (currentAction === "buy_ticket") {
          if (!eventDetails) {
            await addSystemMessage(
              "No problem! Please share the event code you're interested in."
            );
          } else if (!selectedTicketPackage) {
            const packages = eventDetails.ticketPackages
              .map(
                (pkg, index) =>
                  `${index + 1}. ${pkg.name} - GHS${pkg.price} (${
                    pkg.description
                  })`
              )
              .join("\n");
            await addSystemMessage(
              `Here are the packages again:\n${packages}\nWhich package would you like?`
            );
          }
        }
        return;
      } else if (lowerContent === "2") {
        reset();
        setRetryMode(false);
        await addSystemMessage(
          "Alright! Let's start fresh! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉"
        );
        return;
      } else {
        await addSystemMessage(
          "Please type 1 to continue with the current flow or 2 to start over."
        );
        return;
      }
    }

    // Handle retry count response
    if (messages[messages.length - 1]?.content.includes("Would you like to:")) {
      if (lowerContent === "1") {
        resetRetryCount();
        if (currentAction === "vote") {
          await addSystemMessage(
            "Alright! Let's try again. Please send the nominee code you'd like to vote for."
          );
        } else if (currentAction === "buy_ticket") {
          await addSystemMessage(
            "No problem! Let's try again. Please share the event code you're interested in."
          );
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
        if (
          messages[messages.length - 1]?.content.includes("switch to voting")
        ) {
          reset();
          setCurrentAction("vote");
          await addSystemMessage(
            "Great! Let's switch to voting! 🎯 Just send the code of the nominee you'd like to vote for."
          );
        } else {
          reset();
          await addSystemMessage(
            "Alright! Let's start fresh! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉"
          );
        }
        return;
      } else if (lowerContent === "no") {
        if (currentAction === "buy_ticket") {
          await addSystemMessage(
            "No problem! Let's continue with your ticket purchase. What would you like to do next?"
          );
        } else if (currentAction === "vote") {
          await addSystemMessage(
            "Alright! Let's continue with voting. What would you like to do next?"
          );
        }
        return;
      }
    }

    if (!currentAction) {
      if (["1", "vote"].includes(lowerContent.trim().replaceAll(".", ""))) {
        setCurrentAction("vote");
        resetRetryCount();
        await addSystemMessage(
          "Awesome choice! 🎯 Just send the code of the nominee you'd like to vote for, and we'll continue from there!"
        );
      } else if (
        ["2", "buy ticket", "buy tickets"].includes(
          lowerContent.trim().replaceAll(".", "")
        )
      ) {
        setCurrentAction("buy_ticket");
        resetRetryCount();
        await addSystemMessage(
          "Great! 🎟️ Just share the event code with me, and I'll show you all the amazing packages available! ✨"
        );
      } else {
        await handleIncorrectResponse();
        await addSystemMessage(
          "Hey! 😊 What would you like to do?\n1. Vote for a nominee\n2. Buy tickets\nJust type the number (1 or 2) to get started! 🎉"
        );
      }
    } else if (currentAction === "vote") {
      await handleVotingFlow(content);
    } else if (currentAction === "buy_ticket") {
      await handleTicketFlow(
        content,
        eventDetails as EventDetails,
        selectedTicketPackage as TicketPackage
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-2 pb-4">
        <AnimatePresence mode="sync">
          {messages.map((message: ChatMessageType, index: number) => (
            <div
              key={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : undefined}
            >
              <ChatMessage message={message} />
            </div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />

        {isPending && (
          <small className="text-sm px-12 pt-4 inline-flex items-center gap-1 text-gray-500">
            Sending you to the payment page, please wait...
            <Loader className="animate-spin delay-1000" size={15} />
          </small>
        )}
      </div>
      <div className="sticky bottom-0 py-4">
        <ChatInput onSend={handleMessage} />
      </div>
      <small className="text-sm w-full text-center inline-flex hover:underline items-center justify-center gap-1 text-gray-500">
        <a
          href="https://x.com/dev_concept"
          target="_blank"
          rel="noreferrer"
          className="inline-flex gap-1 items-center"
        >
          Powered{" "}
          <ZapIcon fill="yellow" className="text-yellow-300" size={18} /> by
          Small God
        </a>
      </small>
    </div>
  );
};
