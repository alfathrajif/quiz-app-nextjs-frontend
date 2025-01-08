import { Role } from ".";
import { PaymentRequest } from "./payment";
import { Subscription } from "./subscription";

export interface User {
  uuid: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  created_at: Date;
  updated_at: Date;
  subscription: Subscription;
  payment_requests: PaymentRequest[];
}

export interface UserProfileType {
  uuid: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  created_at: Date;
  updated_at: Date;
  subscription: Subscription;
  payment_requests: PaymentRequest[];
}

export interface Administrator {
  uuid: string;
  name: string;
  email: string;
  role?: Role;
  phone: string;
  created_by: Administrator;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}
