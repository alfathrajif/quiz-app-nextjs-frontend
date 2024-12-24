import { Quiz } from "./quiz";
import { Tryout } from "./tryout";
import { User } from "./user";

export interface Section {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  tryout: Tryout;
  tryout_uuid: string;
  created_by: User;
  user_uuid: string;
  quizzes: Quiz[];
  created_at: Date;
  updated_at: Date;
}

export interface CreateSection {
  name: string;
  description: string;
  tryout_uuid: string;
  user_uuid: string;
}
