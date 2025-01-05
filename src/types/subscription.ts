import { SubscriptionPlan } from "./subscription-plan";

export interface Subscription {
  started_date: Date;
  end_date: Date;
  status: string;
  subscription_plan: SubscriptionPlan;
}
