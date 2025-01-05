"use server";
import { API_URL } from "@/constants";
import { getCookieData } from "@/lib/fetch";
import quizService from "@/services/quiz";
import { WebResponse } from "@/types";
import { CreateQuiz, Quiz, UpdateQuiz } from "@/types/quiz";

export async function getQuiz(slug: string) {
  const url = `${API_URL}/quizzes/${slug}`;
  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieData },
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
    return data.data;
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

export async function getQuizzes(sectionSlug?: string): Promise<Quiz[]> {
  let url = `${API_URL}/quizzes?section_slug=${sectionSlug}`;

  if (!sectionSlug) {
    url = `${API_URL}/quizzes`;
  }

  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching quizzes:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch quizzes"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching quizzes:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error fetching quizzes:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function createQuiz(quiz: CreateQuiz) {
  try {
    const res = await quizService.create(quiz);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function updateQuiz(uuid: string, quiz: UpdateQuiz) {
  try {
    const res = await quizService.update(uuid, quiz);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function softDeleteQuiz(uuid: string): Promise<WebResponse<null>> {
  try {
    const res = await quizService.softDeleteQuiz(uuid);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error deleting quiz:", err);
      throw new Error(`Delete error: ${err.message}`);
    } else {
      console.error("Unknown error deleting quiz:", err);
      throw new Error("An unknown error occurred");
    }
  }
}
