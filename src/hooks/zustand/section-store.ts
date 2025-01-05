import { Section } from "@/types/section";
import { create } from "zustand";

type SectionStore = {
  section: Section | null;
  setSection: (section: Section) => void;
};

export const useSectionStore = create<SectionStore>((set) => ({
  section: null,
  setSection: (section) => set(() => ({ section: section })),
}));
