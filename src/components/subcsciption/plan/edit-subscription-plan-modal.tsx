import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoReload } from "react-icons/io5";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { SubscriptionPlanAdmin } from "@/types/subscription-plan";
import { formatNumber } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editSubscriptionPlanAdmin } from "@/actions/subscription-plans";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  price: z.string().min(1, {
    message: "Price is required",
  }),
  duration: z.string().min(1, {
    message: "Duration is required",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface EditSubscriptionPlanModalProps {
  setIsOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: SubscriptionPlanAdmin;
}

const EditSubscriptionPlanModal = ({
  setIsOpenPopover,
  rowData,
}: EditSubscriptionPlanModalProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: rowData.name,
      description: rowData.description,
      price: formatNumber(rowData.price.toString()),
      duration: rowData.duration,
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      const payload = {
        ...values,
        price: parseInt(values.price.replace(/\D/g, "")),
      };

      const result = await editSubscriptionPlanAdmin(payload, rowData.uuid);

      if (result.error) {
        toast({
          title: "Failed to edit subscription plan",
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.refresh();
        setIsOpenDialog(false);
        setIsOpenPopover(false);
        toast({
          title: "Subscription plan edited successfully",
          description: "The subscription plan has been edited successfully",
          variant: "default",
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "An unexpected error occurred",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  let durationTitle: string = "";
  switch (rowData.duration) {
    case "monthly":
      durationTitle = "Monthly";
      break;
    case "weekly":
      durationTitle = "Weekly";
      break;
    case "infinite":
      durationTitle = "Infinite";
      break;
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="justify-between w-full hover:bg-accent">
          Edit
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 gap-y-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader className="p-6">
          <DialogTitle className="mb-2">Edit Subscription Plan</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please change the contents of the following form to change the
            Subscription plan.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 pt-0 space-y-6">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Name<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan judul section"
                        {...field}
                        className={
                          form.formState.errors?.name &&
                          "focus-visible:ring-destructive border-destructive"
                        }
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
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Description<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the description of the subscription plan"
                        {...field}
                        className={
                          form.formState.errors?.description &&
                          "focus-visible:ring-destructive border-destructive"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => {
                  const handleChange = (
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    const inputValue = e.target.value;
                    field.onChange(formatNumber(inputValue));
                  };

                  return (
                    <FormItem className="col-span-2 sm:col-span-1">
                      <FormLabel>
                        Price<span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="relative">
                        <div className="absolute text-sm text-muted-foreground left-3 top-1/2 -translate-y-1/2">
                          Rp
                        </div>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter the price of the subscription plan"
                            {...field}
                            value={field.value}
                            onChange={handleChange}
                            autoComplete="off"
                            className={`pl-[2.1rem] rounded-sm focus-visible:ring-0 ${
                              form.formState.errors?.price &&
                              "focus-visible:ring-destructive border-destructive"
                            }`}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder={durationTitle} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="infinite">Infinite</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpenDialog(false);
                  setIsOpenPopover(false);
                }}>
                Tutup
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <IoReload className="mr-2 h-4 w-4 animate-spin" />
                    Memuat...
                  </div>
                ) : (
                  "Edit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubscriptionPlanModal;
