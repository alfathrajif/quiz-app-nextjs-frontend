"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { IoReload } from "react-icons/io5";
import { CreateQuiz } from "@/types/quiz";
import { Separator } from "../../ui/separator";
import { createQuiz } from "@/actions/quiz";
import { ENV } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { quizSchema, QuizSchemaType } from "@/constants/schema";
import ChoicesFieldArray from "./choices-field-array";

const Create = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<{ tryout_slug: string; section_slug: string }>();

  const form = useForm<CreateQuiz>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [],
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

      const questions = values.questions.map((question, index) => ({
        number: index + 1,
        ...question,
      }));

      const payload = {
        title: values.title,
        description: values.description,
        questions: questions,
        section_slug: params.section_slug,
      };

      const result = await createQuiz(payload);

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

  const autoFill = () => {
    form.setValue("title", "Sample Quiz Title");
    form.setValue("description", "This is a sample description for the quiz.");
    form.setValue("questions", [
      {
        text: "Sample Question 1",
        choices: [
          { text: "Choice 1", is_correct: false },
          { text: "Choice 2", is_correct: true },
          { text: "Choice 3", is_correct: false },
          { text: "Choice 4", is_correct: false },
        ],
        explanation: "This is an explanation for Sample Question 1",
      },
      {
        text: "Sample Question 2",
        choices: [
          { text: "Choice 1", is_correct: false },
          { text: "Choice 2", is_correct: false },
          { text: "Choice 3", is_correct: true },
          { text: "Choice 4", is_correct: false },
        ],
        explanation: "This is an explanation for Sample Question 2",
      },
    ]);
  };

  return (
    <>
      {ENV !== "production" && (
        <div className="mt-4 fixed -translate-x-1/2 -translate-y-1/2 top-20 right-10">
          <Button
            variant="secondary"
            type="button"
            size="lg"
            onClick={autoFill}
            className="w-full text-sm">
            Auto Fill
          </Button>
        </div>
      )}
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
                    placeholder="Judul Quiz"
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
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Masukkan deskripsi untuk quiz"
                    className="resize-none p-4 px-0 border-r-0 border-l-0 border-t-0 border-b-2 rounded-none focus:outline-none focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-6 items-start">
            <h2 className="text-2xl font-semibold">Soal Quiz</h2>
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
                                placeholder={`Masukkan soal no ${
                                  questionIndex + 1
                                } untuk quiz`}
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
                      <h4 className="text-foreground font-medium">
                        Pilihan Ganda
                      </h4>
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
                              Penjelasan Soal
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Masukkan penjelasan untuk soal ini"
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
                <Plus className="w-4 h-4" /> Tambah
              </Button>
            </div>
          </div>
          <div className="flex w-full border-t-2 pt-8">
            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <IoReload className="mr-2 h-4 w-4 animate-spin" />
                  Mohon tunggu
                </div>
              ) : (
                "Tambahkan Quiz"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Create;
