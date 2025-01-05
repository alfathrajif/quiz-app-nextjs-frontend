import instance from "@/lib/axios/instance";
import { CreateQuiz, UpdateQuiz } from "@/types/quiz";

const quizService = {
  create: (quiz: CreateQuiz) =>
    instance
      .post("/quizzes", quiz)
      .then((response) => response)
      .catch((err) => err.response),
  update: (uuid: string, quiz: UpdateQuiz) =>
    instance
      .patch(`/quizzes/${uuid}`, quiz)
      .then((response) => response)
      .catch((err) => err.response),
  softDeleteQuiz: (uuid: string) =>
    instance
      .put(`/quizzes/${uuid}`)
      .then((response) => response)
      .catch((err) => err.response),
};

export default quizService;
