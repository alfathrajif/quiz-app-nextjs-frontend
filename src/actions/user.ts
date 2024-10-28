"use server";
import { API_URL } from "@/constants";
import { getHeaders } from "@/lib/fetch";
import { User } from "@/types/user";

export async function getProfile(): Promise<User> {
  const url = `${API_URL}/users/profile`;

  try {
    const res = await fetch(url, {
      headers: { ...getHeaders() },
      cache: "no-cache",
    });
    const data = await res.json();

    return data.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error; // Rethrow the error so it can be handled by the calling function
  }
}
