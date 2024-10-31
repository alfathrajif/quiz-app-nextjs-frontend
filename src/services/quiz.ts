import instance from "@/lib/axios/instance";
import { CreateQuiz, UpdateQuiz } from "@/types/quiz";

const quizService = {
  create: (quiz: CreateQuiz) =>
    instance
      .post("/quizzes", quiz)
      .then((response) => response)
      .catch((err) => err.response),
  update: (slug: string, quiz: UpdateQuiz) =>
    instance
      .put(`/quizzes/${slug}`, quiz)
      .then((response) => response)
      .catch((err) => err.response),
};

export default quizService;
