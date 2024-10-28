import { Role } from ".";

export interface User {
  uuid: string;
  name: string;
  email: string;
  role: Role;
}
