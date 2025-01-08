import { columns } from "@/components/administrators/table/column";
import { DataTable } from "@/components/administrators/table/data-table";
import { Administrator } from "@/types/user";
import React from "react";

interface AdministratorsCPProps {
  admins: Administrator[];
}

export default function AdministratorsCP({ admins }: AdministratorsCPProps) {
  return <DataTable data={admins} columns={columns} />;
}
