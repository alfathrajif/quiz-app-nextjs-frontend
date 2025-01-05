"use client";
import { Button } from "@/components/ui/button";
import type { QuizAttemptPayload } from "@/types";
import { useEffect, useState } from "react";
import QuestionCard from "./question-card";
import { useQuestionStore } from "../../hooks/zustand/question-store";
import { usePathname, useRouter } from "next/navigation";
import { IoReload } from "react-icons/io5";
import { useShallow } from "zustand/react/shallow";
import { createAttempt } from "@/actions/attempt";
import { useTimeTrackingStore } from "@/hooks/zustand/time-tracking-store";
import { Question } from "@/types/question";

const QuestionCards = ({
  quizUuid,
  questions,
}: {
  quizUuid: string;
  questions: Question[];
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { selectedChoices, resetChoices, setQuestions } = useQuestionStore(
    useShallow((state) => ({
      selectedChoices: state.selectedChoices,
      resetChoices: state.resetChoices,
      setQuestions: state.setQuestions,
    }))
  );

  const { startedAt } = useTimeTrackingStore(
    useShallow((state) => ({
      startedAt: state.startedAt,
    }))
  );

  useEffect(() => {
    resetChoices(questions.length);
    setQuestions(questions);
  }, [resetChoices, questions, setQuestions]);

  const handleSubmit = async () => {
    setIsLoading(true);

    const payload: QuizAttemptPayload = {
      completed_at: new Date(),
      started_at: startedAt ?? new Date(),
      quiz_uuid: quizUuid,
      selected_choices: selectedChoices,
    };

    const result = await createAttempt(payload);

    if (result.success) {
      setTimeout(() => {
        router.push(`${pathname}/result/${result.data.uuid}`);
      }, 1000);
      setTimeout(() => {
        resetChoices(questions.length);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-10 xl:gap-x-16 max-w-7xl mx-auto">
      {questions.map((question, questionIndex) => (
        <QuestionCard
          key={questionIndex}
          question={question}
          questionIndex={questionIndex}
        />
      ))}
      <Button
        type="button"
        disabled={selectedChoices.includes(null) || isLoading}
        onClick={handleSubmit}
        className="mt-4 w-fit">
        {isLoading ? (
          <div className="flex items-center">
            <IoReload className="mr-2 h-4 w-4 animate-spin" />
            Mohon tunggu
          </div>
        ) : (
          "Submit Quiz"
        )}
      </Button>
    </div>
  );
};

export default QuestionCards;
