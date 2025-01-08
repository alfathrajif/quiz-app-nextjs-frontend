import { getAdministrators } from "@/actions/user";
import AdministratorsCP from "@/components/client-page/admin/administrators";
import React from "react";

export default async function Administrators() {
  const admins = await getAdministrators();

  return <AdministratorsCP admins={admins} />;
}
