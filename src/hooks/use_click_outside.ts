"use client";
import { RefObject, useEffect } from "react";

type EventType = MouseEvent | TouchEvent;

// This hook detects clicks outside of the provided refs and calls the handler function.
// It can be used to close dropdowns, modals, or any other component that should close when clicking outside of it.

export default function useClickOutside<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null>[],
  handler: (event: EventType) => void,
  ignoreClasses: string[] = []
) {
  useEffect(() => {
    const listener = (event: EventType) => {
      const isClickOutside = refs.every((ref) => {
        return (
          ref.current &&
          !ref.current.contains(event.target as Node) &&
          !ignoreClasses.some((className) => event.target instanceof HTMLElement && event.target.classList.contains(className))
        );
      });

      if (isClickOutside) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler, ignoreClasses]);
}
