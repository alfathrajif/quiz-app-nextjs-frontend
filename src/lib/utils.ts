import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(value: string) {
  // Remove any non-numeric characters
  const numericValue = value.replace(/\D/g, "");

  // Format the numeric value with a space after every 4 digits
  return numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");
}
