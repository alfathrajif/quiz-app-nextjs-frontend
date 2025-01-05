import { Role } from ".";
import { PaymentRequest } from "./payment";
import { Subscription } from "./subscription";

export interface User {
  uuid: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  subscription?: Subscription;
  payment_requests: PaymentRequest[];
}
