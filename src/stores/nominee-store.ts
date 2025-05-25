import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NomineeDetails } from "@/app/topboy/types";

type NomineeActions = {
  setNominees: (nominees: Record<string, NomineeDetails>) => void;
};

type NomineeStore = {
  nominees: Record<string, NomineeDetails>;
};

const useNomineeStore = create<NomineeStore & NomineeActions>()(
  persist(
    (set) => ({
      nominees: {},

      setNominees: (nominees) =>
        set((state) => ({
          ...state,
          nominees,
        })),
    }),
    {
      name: "nominee-store",
    }
  )
);

export default useNomineeStore;
export type { NomineeStore, NomineeActions };
