import { Subscription } from "./subscription";

export interface SubscriptionPlan {
  uuid: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}

export interface SubscriptionPlanAdmin extends SubscriptionPlan {
  created_at: Date;
  updated_at: Date;
  subscriptions: Subscription[];
  payment_requests: PaymentRequest[];
}

export interface CreateSubscriptionPlan {
  name: string;
  description: string;
  price: number;
  duration: string;
}
