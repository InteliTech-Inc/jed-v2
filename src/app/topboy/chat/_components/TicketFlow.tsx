import { EventDetails, TicketPackage, DUMMY_EVENTS } from "../../types";
import { useChatStore } from "./store";

interface TicketFlowProps {
  eventDetails: EventDetails | null;
  selectedTicketPackage: TicketPackage | null;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useTicketFlow = () => {
  const { addMessage, setEventDetails, setSelectedTicketPackage, reset } = useChatStore();

  const addSystemMessage = async (content: string) => {
    await delay(800); // 800ms delay
    addMessage({
      type: "system",
      content,
    });
  };

  const handleTicketFlow = async (content: string, eventDetails: EventDetails | null, selectedTicketPackage: TicketPackage | null) => {
    if (!eventDetails) {
      const event = DUMMY_EVENTS[content];
      if (event) {
        setEventDetails(event);
        const packages = event.ticketPackages
          .map((pkg: TicketPackage, index: number) => `${index + 1}. ${pkg.name} - GHS${pkg.price} (${pkg.description})`)
          .join("\n");
        await addSystemMessage(
          `Woohoo! 🎉 I found the perfect event for you: ${event.name} at ${event.location}! Here are the amazing packages available:\n${packages}\nJust let me know which package number you'd like to grab! ✨`
        );
      } else {
        await addSystemMessage(
          "Hmm, I couldn't find that event code. 🤔 Could you double-check and try again? I want to make sure you get the right tickets! 🎟️"
        );
      }
    } else if (!selectedTicketPackage) {
      const packageIndex = parseInt(content) - 1;
      const selectedPackage = eventDetails.ticketPackages[packageIndex];
      if (selectedPackage) {
        setSelectedTicketPackage(selectedPackage);
        await addSystemMessage(
          `Excellent choice! 🌟 You've selected the ${selectedPackage.name} package for GHS${selectedPackage.price}. Just type "confirm" to proceed with payment, or "cancel" if you'd like to start over. No pressure! 😊`
        );
      } else {
        await addSystemMessage(
          "Oops! 🙈 That package number doesn't seem right. Could you try again? I want to make sure you get exactly what you're looking for! 💫"
        );
      }
    } else if (content.toLowerCase() === "confirm") {
      await addSystemMessage(
        "Fantastic! 🎊 Your tickets are on their way! Thanks for choosing us - you're going to have an amazing time! Your tickets will be sent to your email shortly. Have fun! 🌟"
      );
      reset();
    } else if (content.toLowerCase() === "cancel") {
      reset();
      await addSystemMessage(
        "No worries at all! 😊 Let's start fresh! Would you like to vote for a nominee or buy tickets? Just type 'vote' or 'buy ticket' and we'll get you sorted! 🎉"
      );
    }
  };

  return { handleTicketFlow };
};
