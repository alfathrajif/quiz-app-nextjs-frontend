import { getSubscriptionPlansAdmin } from "@/actions/subscription-plans";
import AdminSubscriptionPlans from "@/components/client-page/admin-subscription-plans";
import React from "react";

export default async function SubscriptionPlans() {
  const subscriptionPlans = await getSubscriptionPlansAdmin();

  return <AdminSubscriptionPlans subscriptionPlans={subscriptionPlans} />;
}
