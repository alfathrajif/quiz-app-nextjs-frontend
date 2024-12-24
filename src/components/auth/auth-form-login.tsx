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
import { login } from "@/actions/auth";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const AuthFormLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      const result = await login({
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
        router.push("/");
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
    const email = "admin@example.com";
    const password = "Password123";
    form.setValue("email", email);
    form.setValue("password", password);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
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
              "Masuk"
            )}
          </Button>
        </form>
      </Form>
      {ENV !== "production" && (
        <div className="mt-4 absolute -translate-x-1/2 -translate-y-1/2 bottom-0 left-1/2">
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
    </>
  );
};

export default AuthFormLogin;
