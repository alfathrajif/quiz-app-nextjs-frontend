"use server";
import { AUTHENTICATION_COOKIE } from "@/app/(auth)/auth-cookie";
import authServices from "@/services/auth";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { Login, Signup } from "@/types/auth";

export async function login(payload: Login) {
  try {
    const res = await authServices.login(payload);

    if (res.data.success) {
      setAuthCookie(res);
      return res.data;
    }

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function signup(payload: Signup) {
  try {
    const res = await authServices.signup(payload);

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function logout() {
  deleteAuthCookie();
  redirect("/");
}

export async function deleteAuthCookie() {
  cookies().delete(AUTHENTICATION_COOKIE);
}

const setAuthCookie = (response: Response) => {
  let setCookieHeader = response.headers.get("Set-Cookie");

  if (Array.isArray(setCookieHeader)) {
    setCookieHeader = setCookieHeader.join("; ");
  }

  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];

    cookies().set(AUTHENTICATION_COOKIE, token, {
      httpOnly: true,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};

export async function getAuthToken() {
  return cookies().get(AUTHENTICATION_COOKIE)?.value;
}
