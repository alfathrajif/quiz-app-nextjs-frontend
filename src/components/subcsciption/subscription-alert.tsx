"use client";
import { AuthContext } from "@/app/(auth)/auth-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useContext } from "react";

const SubscriptionAlert = () => {
  const { profile } = useContext(AuthContext);

  if (profile?.subscription?.subscription_plan.name !== "basic") {
    return null;
  }

  return (
    <Alert className="max-w-2xl">
      <div className="flex gap-x-3 pb-1">
        <div>
          <ExclamationTriangleIcon className="h-4 w-4 mt-1" />
        </div>
        <div>
          <AlertTitle className="text-base font-semibold">
            Perhatian!
          </AlertTitle>
          <AlertDescription>
            Saat ini anda sedang berlangganan paket <strong>Basic</strong>.
            Silahkan tingkatkan ke paket <strong>Premium</strong> untuk
            mendapatkan akses tryout terbaru.{" "}
            <Link
              href="/pricing"
              className="hover:underline text-primary font-semibold">
              Langganan Sekarang
            </Link>
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default SubscriptionAlert;
