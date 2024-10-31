import { getQuiz } from "@/actions/quiz";
import { columns } from "@/components/question/table/column";
import { DataTable } from "@/components/question/table/data-table";
import { WebResponse } from "@/types";
import { Quiz } from "@/types/quiz";
import React from "react";

const AdminSingleQuiz = async ({
  params,
}: {
  params: { quiz_slug: string };
}) => {
  const quiz: WebResponse<Quiz> = await getQuiz(params.quiz_slug);

  const questions = quiz.data.questions || [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-semibold mb-2">{quiz.data.title}</h1>
        <p className="text-xl text-muted-foreground">{quiz.data.description}</p>
      </div>
      <DataTable data={questions} columns={columns} />
    </div>
  );
};

export default AdminSingleQuiz;
