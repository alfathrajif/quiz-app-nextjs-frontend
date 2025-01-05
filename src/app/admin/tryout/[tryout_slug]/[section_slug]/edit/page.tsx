import { getQuiz } from "@/actions/quiz";
import { UpdateQuizClient } from "@/components/quiz/form";
import { Quiz } from "@/types/quiz";
import { notFound } from "next/navigation";
import React from "react";

export default async function Edit({
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

  return <UpdateQuizClient quiz={quiz} />;
}
