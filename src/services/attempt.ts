import instance from "@/lib/axios/instance";
import { QuizAttemptPayload } from "@/types";

const attemptServices = {
  create: (data: QuizAttemptPayload) =>
    instance
      .post("/quiz-attempts", data)
      .then((response) => response)
      .catch((err) => err.response),
};

export default attemptServices;
