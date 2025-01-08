import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { UserProfileType } from "@/types/user";
import { formatCurrency } from "@/lib/utils";
import PaymentRequestForm from "./payment-request-form";
import Link from "next/link";
import { SubscriptionPlan } from "@/types/subscription-plan";

const PaymentRequest = ({
  profile,
  subscriptionPlan,
}: {
  profile: UserProfileType;
  subscriptionPlan: SubscriptionPlan;
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { duration, name, description, price } = subscriptionPlan;
  const pendingRequest = profile?.payment_requests.find(
    (request) => request.status === "pending"
  );

  let period;

  switch (duration) {
    case "weekly":
      period = "/minggu";
      break;
    case "monthly":
      period = "/bulan";
      break;
    case "infinite":
      period = "";
      break;
  }

  if (pendingRequest) {
    return (
      <Link href={`/u/make-payment?invoice=${pendingRequest.uuid}`} replace>
        <Button>Subscribe</Button>
      </Link>
    );
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={() => setIsOpenDialog(true)}>
      <DialogTrigger asChild>
        <Button>Subscribe</Button>
      </DialogTrigger>
      <DialogContent className="p-8 max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-bold text-3xl capitalize">
            {name}
          </DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div>
          <span className="font-bold text-primary-main text-3xl">
            {name === "premium"
              ? formatCurrency(price, "IDR", "id-ID")
              : "Free!"}{" "}
          </span>
          <span className="text-base text-muted-foreground">{period}</span>
        </div>
        <PaymentRequestForm
          profile={profile}
          subscriptionPlan={subscriptionPlan}
          setIsOpenDialog={setIsOpenDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentRequest;
