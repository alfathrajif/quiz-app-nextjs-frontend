import { getQuiz } from "@/actions/quiz";
import { columns } from "@/components/question/table/column";
import { DataTable } from "@/components/question/table/data-table";
import { Quiz, WebResponse } from "@/types";
import React from "react";

const AdminSingleQuiz = async ({
  params,
}: {
  params: { quiz_slug: string };
}) => {
  const quiz: WebResponse<Quiz> = await getQuiz(params.quiz_slug);

  const questions = quiz.data.questions || [];

  return (
    <div>
      <DataTable data={questions} columns={columns} />
    </div>
  );
};

export default AdminSingleQuiz;
