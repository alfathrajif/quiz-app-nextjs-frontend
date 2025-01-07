"use server";
import { API_URL } from "@/constants";
import { getCookieData } from "@/lib/fetch";
import { User } from "@/types/user";

export async function getProfile(): Promise<User> {
  const url = `${API_URL}/users/profile`;
  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieData },
      cache: "no-cache",
    });
    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error; // Rethrow the error so it can be handled by the calling function
  }
}

export async function getUsersAdmin(): Promise<User[]> {
  const url = `${API_URL}/admin/users`;
  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieData },
      cache: "no-cache",
    });
    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error; // Rethrow the error so it can be handled by the calling function
  }
}
