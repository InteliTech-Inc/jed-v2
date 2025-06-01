"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function VoteSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50/50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="bg-white rounded-xl border border-neutral-200/60  p-8 w-full max-w-screen-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="flex justify-center mb-6"
        >
          <CheckCircle className="w-16 h-16 text-accent" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.4,
          }}
          className="text-2xl font-semibold text-center text-slate-800 mb-4"
        >
          Vote Submitted Successfully!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.5,
          }}
          className="space-y-4 mb-8"
        >
          <p className="text-gray-600 text-center">
            Your vote has been securely recorded and will contribute the event's results. Thank you for participating and using Jed to make your vote count!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.6,
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button className="!py-2" variant={"secondary"} asChild>
            <Link href="/topboy/chat">Vote Again</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
