import Link from "next/link";
import { FlowerIcon, TagIcon, VoteIcon } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SolutionsDropDown() {
  return (
    <div className="animate-dropdown">
      <div className="w-96 border rounded-lg bg-white z-10 p-2 shadow-lg">
        <ul>
          <li className="">
            <Link href="/products/#nominations" className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md">
              <span className="p-2 bg-accent/40 border-accent h-fit border-2  rounded-md">
                <Icon icon={"ph:user-list-light"} className=" size-6 text-secondary" />
              </span>
              <span>
                <p className="font-semibold text-secondary">Nominations</p>
                <p className=" text-sm text-neutral-600">Simplifies the process of submitting nomination forms for events.</p>
              </span>
            </Link>
          </li>
          <li className="">
            <Link href="/products#ticketing" className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md">
              <span className="p-2 bg-accent/40 border-accent h-fit border-2  rounded-md">
                <Icon icon={"fluent-emoji-high-contrast:ticket"} className=" size-6 text-secondary" />
              </span>
              <span>
                <p className="font-semibold text-secondary">Ticketing</p>
                <p className=" text-sm text-neutral-600">Allows event creators to manage ticket types, pricing, and real-time sales monitoring.</p>
              </span>
            </Link>
          </li>
          <li className="">
            <Link href="/products#voting" className="dropdown-item flex gap-4 hover:bg-gray-100 p-2 rounded-md">
              <span className="p-2 bg-accent/40 border-accent h-fit border-2  rounded-md">
                <Icon icon={"material-symbols-light:how-to-vote-outline"} className=" size-6 text-secondary" />
              </span>
              <span>
                <p className="font-semibold text-secondary">Voting</p>
                <p className=" text-sm text-neutral-600">Allows flexibility and transparency, and real-time tracking of votes.</p>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
