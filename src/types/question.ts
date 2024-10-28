import { Choice } from ".";

export interface Question {
  uuid: string;
  number: string;
  text: string;
  explanation: string;
  choices: Choice[];
}
