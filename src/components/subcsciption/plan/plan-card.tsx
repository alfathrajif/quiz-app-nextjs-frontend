"use client";
import { AuthContext } from "@/app/(auth)/auth-context";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import PaymentRequest from "@/components/payment/request/payment-request";
import { User } from "@/types/user";
import { SubscriptionPlan } from "@/types/subscription-plan";

const PlanButtons = ({
  profile,
  subscriptionPlan,
}: {
  profile: User;
  subscriptionPlan: SubscriptionPlan;
}) => {
  const { name: planName } = subscriptionPlan;
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // Conditional rendering based on the selected plan
  if (planName === "premium") {
    // Check if the user's current subscription is "premium"
    if (profile?.subscription?.subscription_plan.name === "premium") {
      return (
        // Button for premium users to proceed to the "tryout" page
        <Button onClick={() => handleNavigation("/tryout")}>Subscribe</Button>
      );
    }

    // Render different options based on whether the user is logged in
    return profile ? (
      // If the user is logged in but not on the premium plan, show the payment request component
      <PaymentRequest profile={profile} subscriptionPlan={subscriptionPlan} />
    ) : (
      // If the user is not logged in, prompt them to log in and redirect to the pricing page
      <Button onClick={() => handleNavigation("/login?redirect=/pricing")}>
        Subscribe
      </Button>
    );
  }

  // Default rendering for non-premium plans
  return (
    <Button
      onClick={() =>
        handleNavigation(profile ? "/tryout" : "/login?redirect=/tryout")
      }
      variant="secondary">
      Subscribe
    </Button>
  );
};

const PlanCard = ({
  subscriptionPlan,
}: {
  subscriptionPlan: SubscriptionPlan;
}) => {
  const { profile } = useContext(AuthContext);
  const { duration, name, description, price } = subscriptionPlan;

  let period;

  switch (duration) {
    case "monthly":
      period = "/monthly";
      break;
    case "weekly":
      period = "/weekly";
      break;
    case "infinite":
      period = "";
      break;
    default:
      break;
  }

  return (
    <div
      className={`w-full rounded-md max-w-sm border shadow-md p-6 flex flex-col justify-between items-start gap-y-4 ${
        name === "basic" ? "order-1" : "order-2"
      }`}>
      <div>
        <h2 className="text-xl uppercase font-bold text-primary-main">
          {name}
        </h2>
        <p className="text-base mt-2">
          <span className="text-muted-foreground">{description}</span>
        </p>
      </div>
      <div>
        <span className="font-bold text-primary-main text-2xl">
          {name === "basic" ? "Free!" : formatCurrency(price, "IDR", "id-ID")}
        </span>
        <span className="text-sm text-muted-foreground">{period}</span>
      </div>
      <PlanButtons profile={profile} subscriptionPlan={subscriptionPlan} />
    </div>
  );
};

export default PlanCard;
