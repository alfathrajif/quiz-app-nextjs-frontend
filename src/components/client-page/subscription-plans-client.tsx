import React from "react";
import { columns } from "@/components/subcsciption/plan/table/column";
import { DataTable } from "@/components/subcsciption/plan/table/data-table";
import { SubscriptionPlanAdmin } from "@/types/subscription-plan";

interface SubcriptionPlansClientProps {
  subscriptionPlans: SubscriptionPlanAdmin[];
}

const SubcriptionPlansClient = ({
  subscriptionPlans,
}: SubcriptionPlansClientProps) => {
  return (
    <div>
      <DataTable data={subscriptionPlans} columns={columns} />
    </div>
  );
};

export default SubcriptionPlansClient;
