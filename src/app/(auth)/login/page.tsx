import { AuthFooter, AuthFormLogin, AuthHeader } from "@/components/auth";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full max-w-sm space-y-5">
      <AuthHeader
        title="Welcome Back to Quiz"
        description="Enter yout email and password to continue"
      />
      <AuthFormLogin />
      <AuthFooter
        description="Don't have an account?"
        linkTitle="Sign Up"
        linkUrl="/sign-up"
      />
    </div>
  );
};

export default LoginPage;
