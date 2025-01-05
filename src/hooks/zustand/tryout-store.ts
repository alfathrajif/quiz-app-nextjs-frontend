import { Tryout } from "@/types/tryout";
import { create } from "zustand";

type TryoutStore = {
  tryout: Tryout | null;
  setTryout: (tryout: Tryout) => void;
};

export const useTryoutStore = create<TryoutStore>((set) => ({
  tryout: null,
  setTryout: (tryout) => set(() => ({ tryout: tryout })),
}));
