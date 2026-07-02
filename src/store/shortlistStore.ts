import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

// Assignment: Zustand store for managing the shortlisted influencers across the application.

interface ShortlistStore {
  shortlisted: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  isShortlisted: (userId: string) => boolean;
}

export const useShortlistStore = create<ShortlistStore>()(
  persist(
    (set, get) => ({
      shortlisted: [],

      addProfile: (profile) =>
        set((state) => {
          if (state.shortlisted.some((p) => p.user_id === profile.user_id)) {
            return state;
          }

          return {
            shortlisted: [...state.shortlisted, profile],
          };
        }),

      removeProfile: (userId) =>
        set((state) => ({
          shortlisted: state.shortlisted.filter(
            (p) => p.user_id !== userId
          ),
        })),

      isShortlisted: (userId) =>
        get().shortlisted.some((p) => p.user_id === userId),
    }),
    {
      name: "shortlist-storage",
    }
  )
);