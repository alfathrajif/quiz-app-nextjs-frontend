"use client";
import { quizSchema, QuizSchemaType } from "@/constants/schema";
import { CreateQuiz, Quiz } from "@/types/quiz";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../../ui/textarea";
import { Separator } from "../../ui/separator";
import ChoicesFieldArray from "./choices-field-array";
import { Plus, X } from "lucide-react";
import { IoReload } from "react-icons/io5";
import { toast } from "@/hooks/use-toast";
import { updateQuiz } from "@/actions/quiz";

const Update = ({ quiz }: { quiz: Quiz }) => {
  const router = useRouter();
  const params = useParams<{ tryout_slug: string; section_slug: string }>();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateQuiz>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions,
    },
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = async (values: QuizSchemaType) => {
    try {
      setIsLoading(true);

      const questions = values.questions.map((question, index) => {
        return {
          uuid: quiz.questions?.[index]?.uuid || "",
          number: index + 1,
          text: question.text,
          explanation: question.explanation,
          choices: question.choices.map((choice, choiceIndex) => {
            return {
              uuid: quiz.questions?.[index]?.choices?.[choiceIndex]?.uuid || "",
              text: choice.text,
              is_correct: choice.is_correct,
            };
          }),
        };
      });

      const payload = {
        uuid: quiz.uuid,
        title: values.title,
        description: values.description,
        questions: questions,
      };

      const result = await updateQuiz(quiz.uuid, payload);

      if (result.error) {
        toast({
          title: result.message,
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: `Quiz ${result.data.title} created successfully`,
          description: result.message,
          variant: "default",
        });
      }
      router.push(`/admin/tryout/${params.tryout_slug}/${params.section_slug}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "An unexpected error occurred",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-4xl">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormControl>
                  <Input
                    className="h-20 px-0 text-3xl border-r-0 border-l-0 border-t-0 border-b-2 rounded-none focus:outline-none focus-visible:ring-0"
                    placeholder="Quiz Title"
                    autoFocus
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Enter a description for the quiz"
                    className="resize-none p-4 px-0 border-r-0 border-l-0 border-t-0 border-b-2 rounded-none focus:outline-none focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-6 items-start">
            <h2 className="text-2xl font-semibold">Questions</h2>
            <div className="flex flex-col gap-10 w-full">
              {questionFields.map((questionField, questionIndex) => (
                <div key={questionField.id} className="flex w-full gap-x-5">
                  <Separator orientation="vertical" className="h-auto" />
                  <div className="space-y-6 w-full">
                    <div className="flex space-x-2 w-full">
                      <div className="h-9 min-w-9 border-2 rounded-md flex items-center justify-center">
                        {questionIndex + 1}
                      </div>
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.text`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Textarea
                                placeholder={`Enter Question ${
                                  questionIndex + 1
                                } for the quiz`}
                                className="resize-none p-4 px-5 border-2 focus:outline-none focus-visible:ring-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        className="border-2 min-w-7 min-h-7 max-h-7 max-w-7"
                        onClick={() => removeQuestion(questionIndex)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="ml-11 space-y-2">
                      <h4 className="text-foreground font-medium">Choices</h4>
                      <ChoicesFieldArray
                        errors={form.formState.errors}
                        control={form.control}
                        questionIndex={questionIndex}
                      />
                    </div>
                    <div className="ml-11 pr-9">
                      <FormField
                        control={form.control}
                        name={`questions.${questionIndex}.explanation`}
                        render={({ field }) => (
                          <FormItem className="grid w-full">
                            <FormLabel className="text-base text-foreground font-medium">
                              Explanation
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter an explanation for the question"
                                className="resize-none p-4 px-5 border-2 focus:outline-none focus-visible:ring-0"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="border-2 w-fit gap-x-2 pl-2.5"
                onClick={() =>
                  appendQuestion({
                    text: "",
                    choices: [],
                    explanation: "",
                  })
                }>
                <Plus className="w-4 h-4" /> Add Question
              </Button>
            </div>
          </div>
          <div className="flex w-full border-t-2 pt-8">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <IoReload className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </div>
              ) : (
                "Update Quiz & Questions"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Update;
