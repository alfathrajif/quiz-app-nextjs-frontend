"use client";
import { UserProfileType } from "@/types/user";
import { ReactNode } from "react";
import { AuthContext } from "./(auth)/auth-context";

interface ProvidersProps {
  children: ReactNode;
  isAuthenticated: boolean;
  profile: UserProfileType;
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
