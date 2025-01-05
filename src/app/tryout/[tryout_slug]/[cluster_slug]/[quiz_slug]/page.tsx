import QuizStart from "@/components/quiz/quiz-start";

const SingleQuiz = ({ params }: { params: { quiz_slug: string } }) => {
  return (
    <div className="">
      <QuizStart slug={params.quiz_slug} />
    </div>
  );
};

export default SingleQuiz;
