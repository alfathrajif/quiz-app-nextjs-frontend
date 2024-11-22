"use server";
import { API_URL } from "@/constants";
import { getCookieData } from "@/lib/fetch";
import paymentService from "@/services/payment";
import { WebResponse } from "@/types";
import {
  CreatePaymentReceipt,
  CreatePaymentRequest,
  PaymentReceipt,
  PaymentRequest,
  UpdatePaymentRequest,
} from "@/types/payment";

export async function createPaymentRequest(
  payment: CreatePaymentRequest
): Promise<WebResponse<PaymentRequest>> {
  try {
    const res = await paymentService.createRequest(payment);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getPaymentRequests(): Promise<PaymentRequest[]> {
  const url = `${API_URL}/payment-requests?sort=due_date:asc`;

  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieData },
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json(); // Attempt to get error message from response
      console.error("Error fetching payment requests:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch payment requests"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching payment requests:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error fetching payment requests:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function updatePaymentRequest(
  paymentRequestUuid: string,
  paymentRequest: Partial<UpdatePaymentRequest>
): Promise<WebResponse<PaymentRequest>> {
  try {
    const res = await paymentService.updateRequest(
      paymentRequestUuid,
      paymentRequest
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function createPaymentReceipt(
  receipt: CreatePaymentReceipt
): Promise<WebResponse<PaymentReceipt>> {
  try {
    const res = await paymentService.createReceipt(receipt);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function uploadReceiptImage(formData: FormData) {
  const url = `${API_URL}/payment-receipts/images`;

  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { Cookie: cookieData },
      body: formData,
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error uploading receipt image:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to upload receipt image"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error uploading receipt image:", err);
      throw new Error(`Upload error: ${err.message}`);
    } else {
      console.error("Unknown error uploading receipt image:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getPaymentReceipts(): Promise<PaymentReceipt[]> {
  const url = `${API_URL}/payment-receipts`;
  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieData },
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error fetching payment receipts:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch payment receipts"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching payment receipts:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error fetching payment receipts:", err);
      throw new Error("An unknown error occurred");
    }
  }
}

export async function updatePaymentReceipt(
  paymentReceiptUuid: string,
  paymentReceipt: {
    status: string;
    remarks?: string;
  }
): Promise<WebResponse<PaymentReceipt>> {
  try {
    const res = await paymentService.updateReceipt(
      paymentReceiptUuid,
      paymentReceipt
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getPaymentVerifications(): Promise<PaymentReceipt[]> {
  const url = `${API_URL}/payment-verifications`;
  const cookieData = String(await getCookieData());

  try {
    const res = await fetch(url, {
      headers: { Cookie: cookieData },
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error fetching payment receipts:", res.status, errorData);
      throw new Error(
        `Error: ${res.status} - ${
          errorData.message || "Failed to fetch payment receipts"
        }`
      );
    }

    const data = await res.json();
    return data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching payment receipts:", err);
      throw new Error(`Fetch error: ${err.message}`);
    } else {
      console.error("Unknown error fetching payment receipts:", err);
      throw new Error("An unknown error occurred");
    }
  }
}
