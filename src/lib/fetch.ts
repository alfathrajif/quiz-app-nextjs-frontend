import { cookies } from "next/headers";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});
