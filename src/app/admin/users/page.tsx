import { getUsersAdmin } from "@/actions/user";
import UsersCP from "@/components/client-page/admin/users";
import React from "react";

export default async function Users() {
  const users = await getUsersAdmin();

  return <UsersCP users={users} />;
}
