import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Quiz } from "@/types";

const QuizCards = ({ quizzes }: { quizzes: Quiz[] }) => {
  if (quizzes.length === 0) {
    return (
      <div className="text-muted-foreground text-xl italic font-light">
        No quizzes found...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <div
          key={quiz.uuid}
          className="border p-4 rounded-xl bg-muted flex flex-col justify-between gap-y-4">
          <div>
            <div className="text-xl">{quiz.title}</div>
            <div className="text-muted-foreground">{quiz.description}</div>
          </div>
          <div className="flex justify-between items-end">
            <div>{quiz.questions_count} Questions</div>
            <Link href={`quizzes/${quiz.slug}`}>
              <Button size="sm" className="font-bold">
                Try
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizCards;
