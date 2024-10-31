import React from "react";
import { getQuiz } from "@/actions/quiz";
import {  WebResponse } from "@/types";
import QuestionCards from "@/components/question/question-cards";
import { Quiz } from "@/types/quiz";

const QuestionsPage = async ({ params }: { params: { quiz_slug: string } }) => {
  const quiz: WebResponse<Quiz> = await getQuiz(params.quiz_slug);

  return (
    <div className="wrapper">
      <div className="content-area py-12">
        <QuestionCards
          quizUuid={quiz.data.uuid}
          questions={quiz.data.questions || []}
        />
      </div>
    </div>
  );
};

export default QuestionsPage;
