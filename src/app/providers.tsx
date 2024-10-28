"use client";
import { ReactNode } from "react";
import { AuthContext } from "./(auth)/auth-context";
import { User } from "@/types/user";

interface ProvidersProps {
  children: ReactNode;
  isAuthenticated: boolean;
  profile: User;
}

export default function Providers({
  children,
  isAuthenticated,
  profile,
}: ProvidersProps) {
  return (
    <AuthContext.Provider value={{ isAuthenticated, profile }}>
      {children}
    </AuthContext.Provider>
  );
}
