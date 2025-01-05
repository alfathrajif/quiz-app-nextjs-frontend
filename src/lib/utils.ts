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

export function formatCurrency(
  amount: number,
  currencyCode: string,
  locale = "en-US"
) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  }).format(amount);
}

export function formatNumber(value: string) {
  // Remove any non-numeric characters
  const numericValue = value.replace(/\D/g, "");

  // Insert '.' as a thousand separator
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
