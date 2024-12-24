export interface Subscription {
  started_date: Date;
  end_date: Date;
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
