import { Subscription } from "./subscription";
import { SubscriptionPlan } from "./subscription-plan";
import { User } from "./user";

export interface CreatePaymentRequest {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  amount: number;
  subscription_plan_uuid: string;
  notes?: string;
}

export interface UpdatePaymentRequest {
  status: string;
}

export interface PaymentRequest {
  uuid: string;
  user_uuid: string;
  subscription_plan_uuid: string;
  subscription_plan: SubscriptionPlan;
  amount: number;
  request_date: Date;
  user: User;
  due_date: Date;
  status: string; // pending, paid, expired, cancelled
  payment_method: string;
  notes?: string;
}

export interface CreatePaymentReceipt {
  payment_request_uuid: string;
  upload_date: Date;
  payment_date: Date;
  payment_proof_image: string;
  amount_paid: number;
  status: string; // submitted, approved, rejected
}

export interface PaymentReceipt {
  uuid: string;
  payment_request_uuid: string;
  payment_request: PaymentRequest;
  upload_date: Date;
  payment_date: Date;
  amount_paid: number;
  payment_proof_image: string;
  status: string; // submitted, approved, rejected
  reviewed_by?: User;
  reviewed_date?: Date;
  remarks?: string;
}

export interface PaymentLog {
  uuid: string;
  user_uuid: string;
  user: User;
  amount: number;
  payment_date: Date;
  subscription_uuid: string;
  subscription: Subscription;
  created_at: Date;
  updated_at: Date;
}
