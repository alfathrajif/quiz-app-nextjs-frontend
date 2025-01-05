import { Quiz } from "@/types/quiz";
import { DataTable } from "@/components/question/table/data-table";
import { columns } from "@/components/question/table/column";

export default function SingleQuizClient({ quiz }: { quiz: Quiz }) {
  return (
    <div>
      <div className="mb-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {quiz.title}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {quiz.description}
        </p>
      </div>
      <DataTable data={quiz.questions} columns={columns} />
    </div>
  );
}
