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
import { SubscriptionPlan } from "@/types/subscription";
import { User } from "@/types/user";
import { formatCurrency } from "@/lib/utils";
import PaymentRequestForm from "./payment-request-form";
import Link from "next/link";

const PaymentRequest = ({
  profile,
  plan,
}: {
  profile: User;
  plan: SubscriptionPlan;
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const pendingRequest = profile?.payment_requests.find(
    (request) => request.status === "pending"
  );

  if (pendingRequest) {
    return (
      <Link href={`/u/make-payment?invoice=${pendingRequest.uuid}`} replace>
        <Button>Pilih Paket</Button>
      </Link>
    );
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={() => setIsOpenDialog(true)}>
      <DialogTrigger asChild>
        <Button>Pilih Paket</Button>
      </DialogTrigger>
      <DialogContent className="p-10 max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Paket Premium</DialogTitle>
          <DialogDescription>{plan.description}</DialogDescription>
        </DialogHeader>
        <div>
          <span className="font-bold text-primary-main text-3xl">
            {plan.name === "premium"
              ? formatCurrency(plan.price, "IDR", "id-ID")
              : "Gratis!"}{" "}
          </span>
          <span className="text-base text-muted-foreground">
            {(plan.duration === "weekly" && "/minggu") ||
              (plan.duration === "monthly" && "/bulan") ||
              (plan.duration === "yearly" && "/tahun")}
          </span>
        </div>
        <PaymentRequestForm
          profile={profile}
          plan={plan}
          setIsOpenDialog={setIsOpenDialog}
        />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentRequest;
