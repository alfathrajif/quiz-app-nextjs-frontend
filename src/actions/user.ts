"use server";
import { API_URL } from "@/constants";
import { getCookieData } from "@/lib/fetch";
import administratorService from "@/services/administrator";
import { WebResponse } from "@/types";
import { Administrator, CreateUser, User } from "@/types/user";

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

export async function getAdministrators(): Promise<Administrator[]> {
  const url = `${API_URL}/admin/administrators`;
  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieData },
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching administrators:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch administrators"
        }`
      );
    }

    const data = await res.json();

    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching administrators:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error fetching administrators:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function createAdministrator(
  payload: CreateUser
): Promise<WebResponse<User>> {
  try {
    const res = await administratorService.createAdministrator(payload);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error creating administrator:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error creating administrator:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function softDeleteAdministrator(
  uuid: string
): Promise<WebResponse<void>> {
  try {
    const res = await administratorService.softDeleteAdministrator(uuid);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error deleting administrator:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error deleting administrator:", err);
      throw new Error("An unknown error occurred");
    }
  }
}
