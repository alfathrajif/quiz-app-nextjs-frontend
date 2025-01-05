import instance from "@/lib/axios/instance";
import { CreateSubscriptionPlan } from "@/types/subscription-plan";

const subscriptionPlanService = {
  createSubscriptionPlanAdmin: (data: CreateSubscriptionPlan) =>
    instance
      .post("/admin/subscription-plans", data)
      .then((response) => response)
      .catch((err) => err.response),
  editSubscriptionPlanAdmin: (uuid: string, data: CreateSubscriptionPlan) =>
    instance
      .patch(`/admin/subscription-plans/${uuid}`, data)
      .then((response) => response)
      .catch((err) => err.response),
  softDeleteSubscriptionPlan: (uuid: string) =>
    instance
      .put(`/admin/subscription-plans/${uuid}`)
      .then((response) => response)
      .catch((err) => err.response),
};

export default subscriptionPlanService;
