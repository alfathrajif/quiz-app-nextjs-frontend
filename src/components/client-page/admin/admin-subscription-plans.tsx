import React from "react";
import { columns } from "@/components/subcsciption/plan/table/column";
import { DataTable } from "@/components/subcsciption/plan/table/data-table";
import { SubscriptionPlanAdmin } from "@/types/subscription-plan";

interface SubcriptionPlansClientProps {
  subscriptionPlans: SubscriptionPlanAdmin[];
}

export default function AdminSubscriptionPlans({
  subscriptionPlans,
}: SubcriptionPlansClientProps) {
  return <DataTable data={subscriptionPlans} columns={columns} />;
}
