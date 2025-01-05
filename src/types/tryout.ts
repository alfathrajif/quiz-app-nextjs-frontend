import { Section } from "./section";
import { User } from "./user";

export interface Tryout {
  uuid: string;
  title: string;
  slug: string;
  description: string;
  created_by: User;
  sections: Section[];
  user_uuid: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTryout {
  title: string;
  description: string;
  user_uuid: string;
}
