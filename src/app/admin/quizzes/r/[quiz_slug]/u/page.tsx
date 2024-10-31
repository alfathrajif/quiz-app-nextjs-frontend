import { getQuiz } from "@/actions/quiz";
import { UpdateQuizQuestion } from "@/components/quiz-question-form";
import { WebResponse } from "@/types";
import { Quiz } from "@/types/quiz";
import React from "react";

const UpdateQuiz = async ({ params }: { params: { quiz_slug: string } }) => {
  const quiz: WebResponse<Quiz> = await getQuiz(params.quiz_slug);

  return (
    <div>
      <UpdateQuizQuestion quiz={quiz.data} />
    </div>
  );
};

export default UpdateQuiz;
