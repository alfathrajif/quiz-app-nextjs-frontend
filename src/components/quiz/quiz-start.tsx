"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { useQuestionStore } from "../../hooks/zustand/question-store";
import { useShallow } from "zustand/react/shallow";
import { useTimeTrackingStore } from "@/hooks/zustand/time-tracking-store";

const QuizStart = ({ slug }: { slug: string }) => {
  const { resetChoices, questions } = useQuestionStore(
    useShallow((state) => ({
      resetChoices: state.resetChoices,
      questions: state.questions,
    }))
  );

  const { setStartedAt } = useTimeTrackingStore(
    useShallow((state) => ({
      setStartedAt: state.setStartedAt,
    }))
  );

  useEffect(() => {
    resetChoices(questions.length);
  }, [resetChoices, questions]);

  const handleStart = () => {
    const now = new Date();
    setStartedAt(now);
  };

  return (
    <Link href={`${slug}/questions`}>
      <Button onClick={handleStart}>Start Quiz</Button>
    </Link>
  );
};

export default QuizStart;
