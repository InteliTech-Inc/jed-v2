"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useState } from "react";

type SearchProps = {
  placeholder: string;
  queryKey: string;
  handleReset: () => void;
};

export default function SearchBar({ placeholder, queryKey, handleReset }: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(searchParams.get(queryKey)?.toString() || "");

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set(queryKey, term);
      } else {
        params.delete(queryKey);
      }
      replace(`${pathname}?${params.toString()}`);
      setTimeout(() => setIsLoading(false), 100);
    },
    200,
    { maxWait: 300 }
  );

  const handleClear = () => {
    handleReset();
    setInputValue("");
    handleSearch("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-start justify-center w-full md:w-[25rem] relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className="mr-2 py-6 border-accent/40 w-full px-4 rounded-full pr-12"
        aria-label="Search"
      />
      {inputValue && (
        <button type="button" onClick={handleClear} className="absolute right-12 top-1/2 -translate-y-1/2 size-8" aria-label="Clear search">
          <X className="size-4 text-gray-500" />
        </button>
      )}
      <Button
        type="submit"
        size="icon"
        disabled={isLoading}
        className="absolute size-10 bg-accent/40 top-1/2 -translate-y-1/2 right-3 rounded-full hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
        aria-label="Search"
      >
        <Search className={`text-secondary ${isLoading ? "animate-pulse" : ""}`} />
      </Button>
    </form>
  );
}
