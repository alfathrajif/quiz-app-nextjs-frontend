"use server";

import { API_URL } from "@/constants";
import { getCookieData } from "@/lib/fetch";
import attemptServices from "@/services/attempt";
import { QuizAttemptPayload, QuizEvaluation, WebResponse } from "@/types";

export async function createAttempt(
  payload: QuizAttemptPayload
): Promise<WebResponse<QuizEvaluation>> {
  try {
    const response = await attemptServices.create(payload);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getAttempt(
  attempt_uuid: string
): Promise<WebResponse<QuizEvaluation>> {
  try {
    const url = `${API_URL}/quiz-attempts/${attempt_uuid}`;
    const cookieData = String(await getCookieData());

    const res = await fetch(url, {
      headers: {
        Cookie: cookieData,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching quiz:", res.status, errorData);
      throw new Error(`${errorData.error || "Failed to fetch quiz"}`);
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching quiz:", error);
      throw new Error(error.message);
    } else {
      console.error("Unknown error fetching quiz:", error);
      throw new Error("An unknown error occurred");
    }
  }
}
