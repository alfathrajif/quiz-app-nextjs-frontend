import { Choice } from ".";

export interface Question {
  uuid: string;
  number: string;
  text: string;
  explanation: string;
  choices: Choice[];
}

export interface CreateQuestion {
  text: string;
  choices: {
    is_correct: boolean;
    text: string;
  }[];
  explanation: string;
}

export interface UpdateQuestion {
  uuid: string;
  text: string;
  choices: {
    uuid: string;
    is_correct: boolean;
    text: string;
  }[];
  explanation: string;
}
