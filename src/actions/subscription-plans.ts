"use server";
import { API_URL } from "@/constants";
import { getCookieData } from "@/lib/fetch";
import subscriptionPlanService from "@/services/subscriptionPlan";
import { WebResponse } from "@/types";
import {
  CreateSubscriptionPlan,
  SubscriptionPlan,
  SubscriptionPlanAdmin,
} from "@/types/subscription-plan";

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  const url = `${API_URL}/subscription-plans`;

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

export async function getSubscriptionPlansAdmin(): Promise<
  SubscriptionPlanAdmin[]
> {
  const url = `${API_URL}/admin/subscription-plans`;
  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieData },
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

export async function createSubscriptionPlanAdmin(
  payload: CreateSubscriptionPlan
): Promise<WebResponse<SubscriptionPlanAdmin>> {
  try {
    const res = await subscriptionPlanService.createSubscriptionPlanAdmin(
      payload
    );
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error creating subscription plan:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error creating subscription plan:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function editSubscriptionPlanAdmin(
  payload: CreateSubscriptionPlan,
  uuid: string
): Promise<WebResponse<SubscriptionPlanAdmin>> {
  try {
    const res = await subscriptionPlanService.editSubscriptionPlanAdmin(
      uuid,
      payload
    );
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error editing subscription plan:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error editing subscription plan:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function softDeleteSubscriptionPlanAdmin(
  uuid: string
): Promise<WebResponse<void>> {
  try {
    const res = await subscriptionPlanService.softDeleteSubscriptionPlan(uuid);
    return res.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error deleting subscription plan:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error deleting subscription plan:", err);
      throw new Error("An unknown error occurred");
    }
  }
}
