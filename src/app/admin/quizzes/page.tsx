import { getQuizzes } from "@/actions/quiz";
import { columns } from "@/components/quiz/table/column";
import { DataTable } from "@/components/quiz/table/data-table";
import React from "react";

export default async function AdminQuizzes() {
  let quizzes = await getQuizzes();

  quizzes = quizzes.map((quiz, index) => {
    const number = `${index + 1}`;

    return {
      number: number,
      ...quiz,
    };
  });

  return (
    <div>
      <DataTable data={quizzes} columns={columns} />
    </div>
  );
}
