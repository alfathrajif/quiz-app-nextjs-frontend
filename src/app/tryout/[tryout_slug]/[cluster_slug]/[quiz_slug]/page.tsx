import UserQuizSingle from "@/components/client-page/user/user-quiz-single";

const SingleQuiz = ({ params }: { params: { quiz_slug: string } }) => {
  return <UserQuizSingle slug={params.quiz_slug} />;
};

export default SingleQuiz;
