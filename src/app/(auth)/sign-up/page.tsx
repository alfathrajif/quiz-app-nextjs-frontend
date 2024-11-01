import { AuthFooter, AuthFormSignup, AuthHeader } from "@/components/auth";
import React from "react";

const SignupPage = () => {
  return (
    <div className="w-full max-w-md space-y-5">
      <AuthHeader
        title="Daftar Akun"
        description="Untuk mendapatkan akses  ke&nbsp;fitur&nbsp;yang&nbsp;tersedia. Silahkan daftar&nbsp;terlebih&nbsp;dahulu dan mulai tryout."
      />
      <AuthFormSignup />
      <AuthFooter
        description="Sudah mempunyai akun?"
        linkTitle="Masuk Sekarang"
        linkUrl="/login"
      />
    </div>
  );
};

export default SignupPage;
