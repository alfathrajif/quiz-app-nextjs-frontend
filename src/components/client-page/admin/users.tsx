import { columns } from "@/components/user/table/column";
import { DataTable } from "@/components/user/table/data-table";
import { User } from "@/types/user";
import React from "react";

interface UsersCPProps {
  users: User[];
}

export default function UsersCP({ users }: UsersCPProps) {
  return <DataTable data={users} columns={columns} />;
}
