import { getQuizzes } from "@/actions/quiz";
import QuizCards from "@/components/quiz/quiz-cards";
import { Quiz } from "@/types/quiz";
import React from "react";

export default async function HomePage() {
  const quizzes: Quiz[] = await getQuizzes();

  return (
    <div className="wrapper">
      <div className="flex items-center justify-center content-area">
        <QuizCards quizzes={quizzes} />
      </div>
    </div>
  );
}
