import { motion } from "framer-motion";
import { ChatMessage as ChatMessageType } from "../../types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.type === "user";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: isUser ? 20 : -20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        y: isUser ? 20 : -20,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 3,
      }}
      className={cn(
        "flex w-full gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex flex-col items-center gap-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/topboy-avatar.svg" alt="Topboy" />
            <AvatarFallback className="bg-primary/10 text-primary">
              TB
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-muted-foreground">
            Topboy
          </span>
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser
            ? "bg-[#dcf8c6] min-w-32 text-primary-foreground border border-accent/40"
            : "bg-white border border-accent/40 text-muted-foreground"
        )}
      >
        <p
          className="text-sm whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: message.content }}
        />
        <span
          className={cn(
            "text-[10px] opacity-70 block",
            isUser ? "text-left text-secondary" : "text-right"
          )}
        >
          {message.timestamp.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      {isUser && (
        <div className="flex flex-col items-center gap-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user-avatar.svg" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary">
              JED
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-muted-foreground">You</span>
        </div>
      )}
    </motion.div>
  );
};
