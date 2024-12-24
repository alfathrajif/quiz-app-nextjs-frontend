"use server";
import { API_URL } from "@/constants";
import tryoutService from "@/services/tryout";
import { WebResponse } from "@/types";
import { CreateTryout, Tryout } from "@/types/tryout";

export async function createTryout(
  tryout: CreateTryout
): Promise<WebResponse<Tryout>> {
  try {
    const res = await tryoutService.createTryout(tryout);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error creating tryout:", err);
      throw new Error(`Create error: ${err.message}`);
    } else {
      console.error("Unknown error creating tryout:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getTryouts(): Promise<Tryout[]> {
  const url = `${API_URL}/tryouts`;

  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching tryouts:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch tryouts"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching tryouts:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error fetching tryouts:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getTryout(slug: string): Promise<Tryout> {
  const url = `${API_URL}/tryouts/${slug}`;

  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching tryout:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch tryout"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching tryout:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error fetching tryout:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function softDeleteTryout(
  uuid: string
): Promise<WebResponse<void>> {
  try {
    const res = await tryoutService.softDeleteTryout(uuid);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error deleting tryout:", err);
      throw new Error(`Delete error: ${err.message}`);
    } else {
      console.error("Unknown error deleting tryout:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editTryout(
  tryout: CreateTryout,
  uuid: string
): Promise<WebResponse<Tryout>> {
  try {
    const res = await tryoutService.editTryout(tryout, uuid);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error editing tryout:", err);
      throw new Error(`Edit error: ${err.message}`);
    } else {
      console.error("Unknown error editing tryout:", err);
      throw new Error("An unknown error occurred");
    }
  }
}
