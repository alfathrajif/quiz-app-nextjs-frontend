import { getAttempt } from "@/actions/attempt";
import { QuestionText } from "@/components/question/question-card";
import {
  Bullet,
  BulletRing,
  ButtonChoice,
} from "@/components/question/question-choice";
import { Answer, Choice } from "@/types";
import Link from "next/link";
import React from "react";
import moment from "moment";
import TimeTracking from "@/components/result/time-tracking";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SingleResultPage = async ({
  params,
}: {
  params: { attempt_uuid: string };
}) => {
  const res = await getAttempt(params.attempt_uuid);

  const { score, answers, quiz, completed_at, started_at } = res.data;

  return (
    <div className="wrapper">
      <div className="content-area max-w-7xl mx-auto py-12 space-y-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-6">
              <p className="text-lg font-semibold border-2 border-b-0 tracking-tight p-1 px-4 w-fit rounded-t-md bg-background border-foreground dark:bg-primary dark:text-primary-foreground dark:border-primary">
                Correct Answer {score}/{quiz.questions_count}
              </p>
              <h2 className="text-3xl font-medium tracking-tight mb-3 bg-foreground w-fit text-background px-4 p-2 rounded-md rounded-tl-none">
                Congratulations, you&apos;ve completed this quiz!
              </h2>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="text-muted-foreground">
                Let&apos;s keep testing your knowledge by playing more quizzes!
              </div>
              <Link
                href="/"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-2 p-0.5 text-sm">
                Explore More
              </Link>
            </div>
          </div>
          <div className="space-y-4 flex flex-col items-end">
            <div className="text-lg font-semibold border-2 tracking-tight p-1 px-4 w-fit rounded-md bg-background border-foreground dark:bg-primary dark:text-primary-foreground dark:border-primary">
              {moment(started_at).format("LL")}
            </div>
            <div className="space-y-2">
              <TimeTracking title="Started" time={started_at} />
              <TimeTracking title="Completed" time={completed_at} />
            </div>
          </div>
        </div>
        <div className="text-3xl font-medium tracking-tight">
          See the answer explanation below
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-10 xl:gap-x-16">
          {answers.map((answer, answerIndex) => (
            <div key={answerIndex} className="mb-6">
              <QuestionText
                number={answer.question?.number}
                text={answer.question?.text}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {answer.question.choices.map((choice, choiceIndex) => {
                  const getBorderColor = (answer: Answer, choice: Choice) => {
                    if (answer.selected_choice_uuid === choice.uuid) {
                      return answer.is_correct
                        ? "border-green-500 text-green-500 group-hover:border-green-500"
                        : "border-red-500 text-red-500 group-hover:border-red-500";
                    }
                    return choice.is_correct
                      ? "border-green-500 text-green-500 group-hover:border-green-500"
                      : "";
                  };

                  const getBulletColor = (answer: Answer, choice: Choice) => {
                    if (answer.selected_choice_uuid === choice.uuid) {
                      return answer.is_correct ? "bg-green-500" : "bg-red-500";
                    }
                    return choice.is_correct ? "bg-green-500" : "";
                  };

                  return (
                    <ButtonChoice
                      key={choiceIndex}
                      className={`border-2 hover:bg-background cursor-default ${getBorderColor(
                        answer,
                        choice
                      )}`}>
                      <BulletRing
                        className={`border-foreground group-hover:border-foreground ${getBorderColor(
                          answer,
                          choice
                        )}`}>
                        <Bullet className={getBulletColor(answer, choice)} />
                      </BulletRing>
                      {choice.text}
                    </ButtonChoice>
                  );
                })}
              </div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1" className="border-b-2">
                  <AccordionTrigger>Click to see explanation!</AccordionTrigger>
                  <AccordionContent>
                    {answer.question.explanation}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleResultPage;
