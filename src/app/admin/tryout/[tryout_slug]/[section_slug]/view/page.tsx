import { getQuiz } from "@/actions/quiz";
import QuizSingleCP from "@/components/client-page/admin/quiz-single";
import { Quiz } from "@/types/quiz";
import { notFound } from "next/navigation";
import React from "react";

export default async function QuizSinglePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const queryQuiz = resolvedSearchParams.quiz;

  const quiz: Quiz = await getQuiz(queryQuiz as string);

  if (!quiz) {
    return notFound();
  }

  return <QuizSingleCP quiz={quiz} />;
}
