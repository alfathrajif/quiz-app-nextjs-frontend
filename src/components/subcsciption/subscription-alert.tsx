"use client";
import { AuthContext } from "@/app/(auth)/auth-context";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { X } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

const SubscriptionAlert = () => {
  const { profile } = useContext(AuthContext);
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  if (profile?.subscription?.subscription_plan.name !== "basic") {
    return null;
  }

  if (!isAlertVisible) {
    return null;
  }

  return (
    <Alert className="max-w-2xl relative">
      <button
        className="absolute top-2.5 right-2.5 text-muted-foreground/70 hover:text-foreground"
        onClick={() => setIsAlertVisible(false)}
        aria-label="Close alert">
        <X className="w-4 h-4" />
      </button>
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
