"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";

export default function GetStartedButton() {
  return (
    <Button
      onClick={() => window.open("https://app.jedevent.com/sign-up", "_blank", "noopener,noreferrer")}
      variant="secondary"
      size="lg"
      className="group rounded-full"
    >
      Get Started
      <Icon icon="solar:arrow-right-linear" className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
    </Button>
  );
}
