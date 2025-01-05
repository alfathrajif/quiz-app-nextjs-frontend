import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Quiz } from "@/types/quiz";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QuizListProps {
  sectionSlug: string;
  quizzes: Quiz[];
}

const QuizList = ({ sectionSlug, quizzes }: QuizListProps) => {
  if (quizzes.length === 0) {
    return (
      <div className="text-muted-foreground text-xl italic font-light">
        No quizzes found...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <Card
          key={quiz.uuid}
          className="flex flex-col justify-between p-6 gap-4 rounded-md">
          <CardHeader className="p-0">
            <CardTitle className="text-xl">{quiz.title}</CardTitle>
            <CardDescription className="text-sm font-light text-muted-foreground/70 line-clamp-1">
              {quiz.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex justify-between items-end">
            <div>{quiz.questions_count} Soal</div>
            <Button asChild size="sm">
              <Link href={`${sectionSlug}/${quiz.slug}`}>Coba</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuizList;
