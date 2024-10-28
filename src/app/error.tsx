"use client";
import { deleteAuthCookie } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const isDevelopment = process.env.NODE_ENV === "development";
  const router = useRouter();

  const handleReset = async () => {
    await deleteAuthCookie();
    router.push("/login");
  };

  return (
    <div className="wrapper">
      <div className="content-area flex items-center justify-center">
        <div className="text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            {isDevelopment ? (
              <p className="text-muted-foreground">{error.message}</p>
            ) : (
              <p className="text-muted-foreground">
                We encountered an issue. Please try again later.
              </p>
            )}
          </div>
          <Button
            onClick={handleReset}
            className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
