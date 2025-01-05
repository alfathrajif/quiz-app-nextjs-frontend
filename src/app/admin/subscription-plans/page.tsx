import { getSubscriptionPlansAdmin } from "@/actions/subscription-plans";
import SubcriptionPlansClient from "@/components/client-page/subscription-plans-client";
import React from "react";

export default async function SubscriptionPlans() {
  const subscriptionPlans = await getSubscriptionPlansAdmin();

  return <SubcriptionPlansClient subscriptionPlans={subscriptionPlans} />;
}
