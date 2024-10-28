import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  profile: {
    uuid: "",
    name: "",
    email: "",
    role: {
      uuid: "",
      name: "",
    },
  },
});
