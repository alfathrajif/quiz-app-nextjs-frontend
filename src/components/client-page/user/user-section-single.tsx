import { Section } from "@/types/section";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";

export default function UserSectionSingle({ section }: { section: Section }) {
  if (section.quizzes.length === 0) {
    return (
      <div className="text-muted-foreground text-xl italic font-light">
        No quizzes found...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      {section.quizzes.map((quiz) => (
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
              <Link href={`${section.slug}/${quiz.slug}`}>Coba</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
