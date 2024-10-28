import { AuthFooter, AuthFormSignup, AuthHeader } from "@/components/auth";
import React from "react";

const SignupPage = () => {
  return (
    <div className="w-full max-w-sm space-y-5">
      <AuthHeader
        title="Join Quiz"
        description="Create an account to start quizzing!"
      />
      <AuthFormSignup />
      <AuthFooter
        description="Already have an account?"
        linkTitle="Login"
        linkUrl="/login"
      />
    </div>
  );
};

export default SignupPage;
