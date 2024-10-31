import { z } from "zod";

export const quizSchema = z.object({
  title: z.string().min(1, { message: "Quiz title is required" }),
  description: z.string().min(1, { message: "Quiz description is required" }),
  questions: z.array(
    z.object({
      text: z.string().min(1, { message: "Question text is required" }),
      choices: z
        .array(
          z.object({
            is_correct: z.boolean(),
            text: z.string().min(1, { message: "Choice text is required" }),
          })
        )
        .refine(
          (choices) => choices.some((choice) => choice.is_correct),
          "Select one correct answer is required"
        )
        .refine(
          (choices) =>
            choices.filter((choice) => choice.is_correct).length === 1,
          "Only one choice can be correct"
        ),
      explanation: z
        .string()
        .min(1, { message: "Question explanation is required" }),
    })
  ),
});

export type QuizSchemaType = z.infer<typeof quizSchema>;
