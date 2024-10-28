import instance from "@/lib/axios/instance";
import { Login, Signup } from "@/types/auth";

const authServices = {
  login: (data: Login) =>
    instance
      .post("/auth/login", data)
      .then((response) => response)
      .catch((err) => err.response),
  signup: (data: Signup) =>
    instance
      .post("/auth/signup", data)
      .then((response) => response)
      .catch((err) => err.response),
};

export default authServices;
