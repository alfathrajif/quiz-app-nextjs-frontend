import QuizStart from "@/components/quiz/quiz-start";

const SingleQuiz = ({ params }: { params: { quiz_slug: string } }) => {
  return (
    <div className="wrapper">
      <div className="content-area flex justify-center items-center">
        <QuizStart slug={params.quiz_slug} />
      </div>
    </div>
  );
};

export default SingleQuiz;
