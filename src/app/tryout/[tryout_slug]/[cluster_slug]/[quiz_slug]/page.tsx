import QuizStart from "@/components/quiz/quiz-start";

const SingleQuiz = ({ params }: { params: { quiz_slug: string } }) => {
  return <QuizStart slug={params.quiz_slug} />;
};

export default SingleQuiz;
