import { User } from "@/types/user";
import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  profile: {},
} as {
  isAuthenticated: boolean;
  profile: User;
});
