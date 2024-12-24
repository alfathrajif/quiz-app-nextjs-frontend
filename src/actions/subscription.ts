"use server";
import { API_URL } from "@/constants";
import { SubscriptionPlan } from "@/types/subscription";

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const url = `${API_URL}/subcription-plans`;

  try {
    const res = await fetch(url, {
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error(
        "Error fetching subscription plans:",
        res.status,
        errorData
      );
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch subscription plans"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching subscription plans:", error);
      throw new Error(`Fetch error: ${error.message}`);
    } else {
      console.error("Unknown error fetching subscription plans:", error);
      throw new Error("An unknown error occurred");
    }
  }
}
