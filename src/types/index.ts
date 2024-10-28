import { Question } from "./question";
import { User } from "./user";

export interface Choice {
  uuid: string;
  choice_text: string;
  is_correct: boolean;
  created_at: Date;
}

export interface Role {
  uuid: string;
  name: "admin" | "user";
}

export interface WebResponse<T> {
  message: string;
  success: boolean;
  status_code: number;
  data: T;
}

export interface Quiz {
  uuid: string;
  slug: string;
  title: string;
  description: string;
  questions_count: number;
  questions?: Question[];
  created_by: {
    user: User;
  };
  created_at: Date;
}

export interface QuizAttemptPayload {
  quiz_uuid: string;
  started_at: Date;
  completed_at: Date;
  selected_choices: (Choice | null)[];
}

export interface QuizAttempt {
  uuid: string;
  quiz: Quiz;
  score: number;
  started_at: Date;
  completed_at: Date;
}

export interface Answer {
  uuid: string;
  question_uuid: string;
  question: Question;
  quiz_attempt_uuid: string;
  attempt?: QuizAttempt;
  selected_choice_uuid: string;
  choice?: Choice;
  is_correct: boolean;
  created_at: Date;
}

export interface QuizEvaluation extends QuizAttempt {
  answers: Answer[];
}
