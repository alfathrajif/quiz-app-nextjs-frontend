import React from "react";
import QuestionCards from "../../question/question-cards";
import { Quiz } from "@/types/quiz";

export default function UserQuestions({ quiz }: { quiz: Quiz }) {
  return (
    <div className="wrapper">
      <div className="content-area py-12">
        <QuestionCards quizUuid={quiz.uuid} questions={quiz.questions || []} />
      </div>
    </div>
  );
}
