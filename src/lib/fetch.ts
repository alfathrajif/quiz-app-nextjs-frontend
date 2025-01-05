import { cookies } from "next/headers";

export async function getCookieData() {
  const cookieData = cookies().toString();
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(cookieData);
    }, 1000)
  );
}
