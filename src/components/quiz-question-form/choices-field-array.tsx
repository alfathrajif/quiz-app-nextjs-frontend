import { Control, FieldErrors, useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { CreateQuiz } from "@/types/quiz";
import { Checkbox } from "../ui/checkbox";

interface ChoicesFieldArrayProps {
  errors: FieldErrors<CreateQuiz>;
  control: Control<CreateQuiz>;
  questionIndex: number;
}

const ChoicesFieldArray = ({
  errors,
  control,
  questionIndex,
}: ChoicesFieldArrayProps) => {
  const {
    fields: choiceFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`, // Reference to the specific question's choices array
  });

  return (
    <>
      {choiceFields.length ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-4">
          {choiceFields.map((choiceField, choiceIndex) => (
            <div key={choiceField.id} className="flex items-start gap-2">
              <div className="w-full space-y-3">
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.choices.${choiceIndex}.text`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder={`Choice ${choiceIndex + 1}`}
                          className="h-12 px-5 border-2 focus:outline-none focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`questions.${questionIndex}.choices.${choiceIndex}.is_correct`}
                  render={({ field }) => (
                    <FormItem className="flex items-center flex-row space-x-2 space-y-1">
                      <FormControl>
                        <Checkbox
                          className="h-5 w-5"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel
                        className={`cursor-pointer font-light ${
                          field.value && "text-primary"
                        }`}>
                        Correct Answer
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                size="icon"
                variant="outline"
                className="border-2 min-w-7 min-h-7 max-h-7 max-w-7"
                onClick={() => removeChoice(choiceIndex)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {errors.questions?.[questionIndex]?.choices && (
        <div className="text-red-500 text-sm pb-4">
          {errors.questions?.[questionIndex]?.choices?.root?.message}
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={() => appendChoice({ is_correct: false, text: "" })}
        className="border-2">
        Add Choice
      </Button>
    </>
  );
};

export default ChoicesFieldArray;
