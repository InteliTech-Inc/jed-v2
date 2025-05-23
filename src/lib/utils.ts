import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeChatResponse(str: string) {
  return str.trim().replace(/[.,!?:;'"\s]/g, "");
}

export const formatJedError = (error: AxiosError) => {
  const errorMessage = (error.response?.data as { error: { message: string } })
    ?.error?.message;
  return errorMessage;
};
