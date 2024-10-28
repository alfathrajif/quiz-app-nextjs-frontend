import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import { Choice } from "@/types";
import { useQuestionStore } from "../../hooks/zustand/question-store";
import { useShallow } from "zustand/react/shallow";
import { cn } from "@/lib/utils";

const QuestionChoice = ({
  choice,
  questionIndex,
}: {
  choice: Choice;
  questionIndex: number;
}) => {
  const { selectedChoices, setSelectedChoices } = useQuestionStore(
    useShallow((state) => ({
      selectedChoices: state.selectedChoices,
      setSelectedChoices: state.setSelectedChoices,
    }))
  );

  const handleChoiceChange = (questionIndex: number, choice: Choice) => {
    const choicePayload = {
      ...choice,
      created_at: new Date(),
    };
    setSelectedChoices(choicePayload, questionIndex);
  };

  return (
    <ButtonChoice
      onClick={() => handleChoiceChange(questionIndex, choice)}
      className={
        selectedChoices[questionIndex]?.choice_text === choice.choice_text
          ? "bg-foreground text-background hover:bg-muted-foreground"
          : "bg-background text-foreground"
      }>
      <BulletRing
        className={
          selectedChoices[questionIndex]?.choice_text === choice.choice_text
            ? "border-background p-1"
            : "border-foreground group-hover:border-foreground"
        }>
        <Bullet
          className={
            selectedChoices[questionIndex]?.choice_text === choice.choice_text
              ? "bg-background"
              : "bg-transparent"
          }
        />
      </BulletRing>
      {choice.choice_text}
    </ButtonChoice>
  );
};

interface ButtonChoiceProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  children: ReactNode;
}

export const ButtonChoice = ({
  onClick,
  className,
  children,
}: ButtonChoiceProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "border group justify-start h-11 gap-x-2 hover:bg-muted bg-background text-foreground",
        className
      )}>
      {children}
    </Button>
  );
};

export const BulletRing = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full border-2 p-1 overflow-hidden",
        className
      )}>
      {children}
    </div>
  );
};

export const Bullet = ({ className }: { className?: string }) => {
  return <div className={cn("rounded-full w-full h-full", className)} />;
};

export default QuestionChoice;
