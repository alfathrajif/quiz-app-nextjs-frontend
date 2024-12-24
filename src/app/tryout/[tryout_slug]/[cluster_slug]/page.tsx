import { getQuizzes } from "@/actions/quiz";
import QuizList from "@/components/quiz/quiz-list";
import React from "react";

export default async function SingleSection({
  params,
}: {
  params: { section_slug: string };
}) {
  const quizzes = await getQuizzes(params.section_slug);

  return <QuizList sectionSlug={params.section_slug} quizzes={quizzes} />;
}
