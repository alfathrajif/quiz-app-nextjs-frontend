import React from "react";
import QuestionChoice from "./question-choice";
import { Question } from "@/types/question";

const QuestionCard = ({
  question,
  questionIndex,
}: {
  question: Question;
  questionIndex: number;
}) => {
  return (
    <div className="mb-6">
      <QuestionText number={question.number} text={question.text} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {question.choices.map((choice, index) => (
          <QuestionChoice
            key={index}
            choice={choice}
            questionIndex={questionIndex}
          />
        ))}
      </div>
    </div>
  );
};

export const QuestionText = ({
  number,
  text,
}: {
  number: string;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-x-3 mb-4">
      <div className="text-xl font-semibold min-h-9 min-w-9 bg-foreground text-background flex items-center justify-center rounded-md">
        {number}
      </div>
      <div className="text-lg font-medium">{text}</div>
    </div>
  );
};

export default QuestionCard;
