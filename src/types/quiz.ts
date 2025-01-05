import { CreateQuestion, Question, UpdateQuestion } from "./question";
import { User } from "./user";

export interface CreateQuiz {
  title: string;
  description: string;
  questions: CreateQuestion[];
  section_slug: string;
}

export interface UpdateQuiz {
  uuid: string;
  title: string;
  description: string;
  questions: UpdateQuestion[];
}

export interface Quiz {
  uuid: string;
  slug: string;
  title: string;
  description: string;
  questions_count: number;
  questions: Question[];
  created_by: {
    user: User;
  };
  created_at: Date;
}
