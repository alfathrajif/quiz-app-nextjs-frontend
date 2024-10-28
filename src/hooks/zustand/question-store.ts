import { Choice } from "@/types";
import { Question } from "@/types/question";
import { create } from "zustand";

type QuestionStore = {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  selectedChoices: (Choice | null)[];
  setSelectedChoices: (choice: Choice, questionIndex: number) => void;
  resetChoices: (length: number) => void;
};

export const useQuestionStore = create<QuestionStore>((set) => ({
  questions: [],
  setQuestions: (questions) => set(() => ({ questions: questions })),
  selectedChoices: [],
  setSelectedChoices: (choice, questionIndex) =>
    set((state) => {
      const updatedChoices = [...state.selectedChoices];
      updatedChoices[questionIndex] = choice;
      return { selectedChoices: updatedChoices };
    }),
  resetChoices: (length) =>
    set(() => ({ selectedChoices: Array(length).fill(null) })),
}));
