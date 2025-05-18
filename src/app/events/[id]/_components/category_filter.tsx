"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
};

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-72 justify-between shadow-none !h-12">
          {selectedCategory === "all" ? "All Categories" : categories.find((category) => category === selectedCategory) || "Select category"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value="all"
              onSelect={() => {
                onCategoryChange("all");
                setOpen(false);
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", selectedCategory === "all" ? "opacity-100" : "opacity-0")} />
              All Categories
            </CommandItem>
            {categories.map((category) => (
              <CommandItem
                key={category}
                value={category}
                onSelect={() => {
                  onCategoryChange(category);
                  setOpen(false);
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", selectedCategory === category ? "opacity-100" : "opacity-0")} />
                {category}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
