import { getQuiz } from "@/actions/quiz";
import SingleQuizClient from "@/components/client-page/single-quiz-client";
import { Quiz } from "@/types/quiz";
import { notFound } from "next/navigation";
import React from "react";

export default async function SingleQuiz({
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

  return <SingleQuizClient quiz={quiz} />;
}
