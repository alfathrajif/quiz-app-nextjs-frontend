"use client";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatPhone } from "@/lib/utils";
import { IoReload } from "react-icons/io5";
import { toast } from "@/hooks/use-toast";
import { SubscriptionPlan } from "@/types/subscription";
import { createPaymentRequest } from "@/actions/payment";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "First name is required",
  }),
  last_name: z.string(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  notes: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const PaymentRequestForm = ({
  profile,
  plan,
  setIsOpenDialog,
}: {
  profile: User;
  plan: SubscriptionPlan;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: profile.name.split(" ")[0],
      last_name:
        profile.name.split(" ")[1] ||
        profile.name.split(" ")[1] + profile.name.split(" ")[2],
      phone: profile.phone || "",
      email: profile.email,
      notes: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      const payload = {
        ...values,
        amount: plan.price,
        subscription_plan_uuid: plan.uuid,
      };

      const result = await createPaymentRequest(payload);

      if (result.error) {
        toast({
          title: result.message,
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.push(`/u/make-payment?invoice=${result.data.uuid}`);
      }

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-6 gap-4 grid grid-cols-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>
                  Nama Depan<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama depan"
                    {...field}
                    autoComplete="additional-name webauthn"
                    className={
                      form.formState.errors?.first_name &&
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
            name="last_name"
            render={({ field }) => (
              <FormItem className="col-span-2 sm:col-span-1">
                <FormLabel>
                  Nama Belakang<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan nama belakang"
                    {...field}
                    autoComplete="additional-name webauthn"
                    className={
                      form.formState.errors?.last_name &&
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
            name="phone"
            render={({ field }) => {
              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const inputValue = e.target.value;
                field.onChange(formatPhone(inputValue));
              };

              return (
                <FormItem className="col-span-2">
                  <FormLabel>
                    Nomor Telepon / WhatsApp
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E.g. 081234567890"
                      {...field}
                      value={field.value}
                      onChange={handleChange}
                      autoComplete="additional-name webauthn"
                      className={
                        form.formState.errors?.last_name &&
                        "focus-visible:ring-destructive border-destructive"
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>
                  Email<span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Alamat Email"
                    {...field}
                    autoComplete="email"
                    className={
                      form.formState.errors?.email &&
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
            name="notes"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tambahkan catatan terkait pembayaran"
                    className="resize-none py-2.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-x-2">
          <Button
            size="lg"
            type="button"
            variant="outline"
            onClick={() => setIsOpenDialog(false)}>
            Tutup
          </Button>
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <IoReload className="mr-2 h-4 w-4 animate-spin" />
                Memuat...
              </div>
            ) : (
              "Kirim Permintaan Paket Premium"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentRequestForm;
