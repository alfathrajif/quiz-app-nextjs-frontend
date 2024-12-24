import { getTryouts } from "@/actions/tryout";
import { columns } from "@/components/tryout/table/column";
import { DataTable } from "@/components/tryout/table/data-table";
import React, { Suspense } from "react";

export default async function Tryout() {
  const tryouts = await getTryouts();

  return (
    <Suspense fallback={<></>}>
      <DataTable data={tryouts} columns={columns} />
    </Suspense>
  );
}
