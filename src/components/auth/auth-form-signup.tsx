"use client";
import { ENV } from "@/constants";
import React from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffSharp, IoEyeSharp, IoReload } from "react-icons/io5";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { signup } from "@/actions/auth";
import { formatPhone } from "@/lib/utils";

const formSchema = z
  .object({
    first_name: z.string().min(1, {
      message: "First name is required",
    }),
    last_name: z.string(),
    phone: z.string().min(1, { message: "Phone number is required" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type FormSchemaType = z.infer<typeof formSchema>;

const AuthFormSignup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      const result = await signup({
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone.replace(/\s/g, ""),
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        toast({
          title: result.message,
          description: result.error,
          variant: "destructive",
        });
      } else {
        toast({
          description: result.message,
          variant: "default",
        });
        router.push("/login");
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

  const autoFillLogin = () => {
    const firstName = `User${Math.floor(Math.random() * 1000)}`;
    const lastName = `Last${Math.floor(Math.random() * 1000)}`;
    const email = `user${Math.floor(Math.random() * 1000)}@example.com`;
    const phone = "081234567890";
    const password = "Password123";
    form.setValue("first_name", firstName);
    form.setValue("last_name", lastName);
    form.setValue("phone", formatPhone(phone));
    form.setValue("email", email);
    form.setValue("password", password);
    form.setValue("confirm_password", password);
  };

  return (
    <>
      {ENV !== "production" && (
        <div className="mt-4 absolute -translate-x-1/2 -translate-y-1/2 bottom-0 left-20">
          <Button
            variant="secondary"
            type="button"
            size="lg"
            onClick={autoFillLogin}
            className="w-full text-sm">
            Auto Fill
          </Button>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-6 gap-4 grid grid-cols-2">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="col-span-2 sm:col-span-1">
                  <FormLabel>Nama Depan</FormLabel>
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
                  <FormLabel>Nama Belakang</FormLabel>
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
                const handleChange = (
                  e: React.ChangeEvent<HTMLInputElement>
                ) => {
                  const inputValue = e.target.value;
                  field.onChange(formatPhone(inputValue));
                };

                return (
                  <FormItem className="col-span-2">
                    <FormLabel>Nomor Telepon / WhatsApp</FormLabel>
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
                  <FormLabel>Email</FormLabel>
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
              name="password"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password webauthn"
                        {...field}
                        className={
                          form.formState.errors?.password &&
                          "focus-visible:ring-destructive border-destructive"
                        }
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      className="px-2 absolute top-1/2 -translate-y-1/2 right-2 hover:bg-transparent">
                      {showPassword ? (
                        <IoEyeOffSharp className="text-xl text-zinc-700 hover:text-zinc-600" />
                      ) : (
                        <IoEyeSharp className="text-xl text-zinc-700 hover:text-zinc-600" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Masukkan ulang password"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password webauthn"
                        {...field}
                        className={
                          form.formState.errors?.confirm_password &&
                          "focus-visible:ring-destructive border-destructive"
                        }
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="px-2 absolute top-1/2 -translate-y-1/2 right-2 hover:bg-transparent">
                      {showConfirmPassword ? (
                        <IoEyeOffSharp className="text-xl text-zinc-700 hover:text-zinc-600" />
                      ) : (
                        <IoEyeSharp className="text-xl text-zinc-700 hover:text-zinc-600" />
                      )}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
              "Daftar"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AuthFormSignup;
