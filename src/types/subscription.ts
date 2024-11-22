export interface Subscription {
  started_Date: Date;
  end_Date: Date;
  status: string;
  subscription_plan: SubscriptionPlan;
}

export interface SubscriptionPlan {
  uuid: string;
  name: string;
  description: string;
  price: number;
  duration: string;
}
