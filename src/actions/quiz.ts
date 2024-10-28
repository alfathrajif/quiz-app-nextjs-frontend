"use server";
import { API_URL } from "@/constants";
import { getHeaders } from "@/lib/fetch";
import { Quiz } from "@/types";

export async function getQuiz(slug: string) {
  const url = `${API_URL}/quizzes/${slug}`;

  try {
    const res = await fetch(url, {
      headers: { ...getHeaders() },
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching quiz:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${errorData.message || "Failed to fetch quiz"}`
      );
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching quiz:", error);
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      console.error("Unknown error fetching quiz:", error);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getQuizzes(): Promise<Quiz[]> {
  const url = `${API_URL}/quizzes`;
  const res = await fetch(url, { cache: "no-cache" });
  const data = await res.json();
  return data.data;
}
