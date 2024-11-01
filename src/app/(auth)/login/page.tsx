import { AuthFooter, AuthFormLogin, AuthHeader } from "@/components/auth";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-full max-w-md space-y-5">
      <AuthHeader
        title="Selamat Datang di Kalkulus"
        description="Silahan masuk email dan password untuk melanjutkan"
      />
      <AuthFormLogin />
      <AuthFooter
        description="Belum mempunyai akun?"
        linkTitle="Daftar Sekarang"
        linkUrl="/sign-up"
      />
    </div>
  );
};

export default LoginPage;
