"use client";
import { AuthContext } from "@/app/(auth)/auth-context";
import { formatCurrency } from "@/lib/utils";
import { SubscriptionPlan } from "@/types/subscription";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import PaymentRequest from "../payment/request/payment-request";
import { User } from "@/types/user";

const PlanCard = ({ plan }: { plan: SubscriptionPlan }) => {
  const { profile } = useContext(AuthContext);

  return (
    <div
      key={plan.uuid}
      className={`rounded-md border shadow-md p-8 flex flex-col justify-between items-start gap-y-8 ${
        plan.name === "basic" ? "order-1" : "order-2"
      }`}>
      <div>
        <h2 className="text-xl uppercase font-bold text-primary-main">
          {plan.name}
        </h2>
        <p className="text-base mt-2">
          <span className="text-muted-foreground">{plan.description} </span>
        </p>
      </div>
      <div>
        <span className="font-bold text-primary-main text-2xl">
          {plan.name === "premium"
            ? formatCurrency(plan.price, "IDR", "id-ID")
            : "Gratis!"}{" "}
        </span>
        <span className="text-sm text-muted-foreground">
          {(plan.duration === "weekly" && "/minggu") ||
            (plan.duration === "monthly" && "/bulan") ||
            (plan.duration === "yearly" && "/tahun")}
        </span>
      </div>
      <PlanButtons profile={profile} plan={plan} />
    </div>
  );
};

const PlanButtons = ({
  profile,
  plan,
}: {
  profile: User;
  plan: SubscriptionPlan;
}) => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  if (plan.name === "premium") {
    return profile?.subscription?.subscription_plan.name === "premium" ? (
      <Button onClick={() => router.push("/quizzes")}>Pilih Paket</Button>
    ) : profile ? (
      <PaymentRequest profile={profile} plan={plan} />
    ) : (
      <Button onClick={() => router.push("/login")}>Pilih Paket</Button>
    );
  }

  return (
    <Button onClick={() => router.push("/quizzes")} variant="secondary">
      Pilih Paket
    </Button>
  );
};

export default PlanCard;
