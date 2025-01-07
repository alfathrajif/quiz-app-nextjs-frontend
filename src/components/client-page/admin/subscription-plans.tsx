import React from "react";
import { columns } from "@/components/subcsciption/plan/table/column";
import { DataTable } from "@/components/subcsciption/plan/table/data-table";
import { SubscriptionPlanAdmin } from "@/types/subscription-plan";

interface SubsPlansCPProps {
  subscriptionPlans: SubscriptionPlanAdmin[];
}

export default function SubsPlansCP({ subscriptionPlans }: SubsPlansCPProps) {
  return <DataTable data={subscriptionPlans} columns={columns} />;
}
