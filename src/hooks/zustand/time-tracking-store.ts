import { create } from "zustand";

type TimeTrackingStore = {
  startedAt: Date | null;
  setStartedAt: (time: Date | null) => void;
  completedAt: Date | null;
  setCompletedAt: (time: Date | null) => void;
};

export const useTimeTrackingStore = create<TimeTrackingStore>((set) => ({
  startedAt: null,
  setStartedAt: (time) => set(() => ({ startedAt: time })),
  completedAt: null,
  setCompletedAt: (time) => set(() => ({ completedAt: time })),
}));
