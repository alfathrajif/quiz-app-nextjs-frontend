import React from "react";
import { getQuiz } from "@/actions/quiz";
import { Quiz } from "@/types/quiz";
import UserQuestions from "@/components/client-page/user/user-questions";

const QuestionsPage = async ({ params }: { params: { quiz_slug: string } }) => {
  const quiz: Quiz = await getQuiz(params.quiz_slug);
  return <UserQuestions quiz={quiz} />;
};

export default QuestionsPage;
