"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button variant="link" className="shadow-none" onClick={() => router.back()}>
      <ArrowLeft />
      Back
    </Button>
  );
}
