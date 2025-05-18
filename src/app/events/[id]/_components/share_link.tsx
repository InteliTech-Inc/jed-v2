"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface ShareLinkProps {
  code: string;
}

export default function ShareLink({ code }: ShareLinkProps) {
  const [isCopied, setIsCopied] = useState(false);

  const resetCopiedState = useCallback(() => {
    const timeout = setTimeout(() => {
      setIsCopied(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const shareOrCopy = async (url: string) => {
    try {
      if (navigator.share) {
        navigator.clipboard.writeText(url);
        await navigator.share({
          url,
          title: "JED | Voting",
          text: "Vote for a nominee",
        });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
      setIsCopied(true);
      resetCopiedState();
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Failed to share link");
      }
    }
  };

  const shortenUrl = async (url: string, alias: string) => {
    const toastId = toast.loading("Shortening link...");

    try {
      const { data } = await axios.post(
        "https://spoo.me/",
        { url, alias },
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      toast.success("URL shortened successfully", { id: toastId });
      return data.short_url;
    } catch (error) {
      if (error instanceof AxiosError) {
        const err = error.response?.data;

        if (err?.alias) {
          const shortUrl = `https://spoo.me/${err.alias}`;
          toast.success("Link copied to clipboard", { id: toastId });
          return shortUrl;
        }

        toast.error(err?.message || "Failed to shorten link", { id: toastId });
        return null;
      }

      toast.error("Failed to shorten link", { id: toastId });
      return null;
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const shortUrl = await shortenUrl(currentUrl, code);

    if (shortUrl) {
      await shareOrCopy(shortUrl);
    } else {
      await shareOrCopy(currentUrl);
    }
  };

  return (
    <button onClick={handleShare} className="w-fit flex items-center sm:w-auto group" disabled={isCopied}>
      {isCopied ? (
        <>
          <Check className="size-4 mr-2" />
          Copied link
        </>
      ) : (
        <>
          <Share2 className="size-4 mr-2 group-hover:rotate-12 transition-transform" />
          Share Link
        </>
      )}
    </button>
  );
}
