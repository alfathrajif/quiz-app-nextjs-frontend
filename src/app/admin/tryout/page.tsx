import { getTryouts } from "@/actions/tryout";
import { columns } from "@/components/tryout/table/column";
import { DataTable } from "@/components/tryout/table/data-table";

export default async function Tryout() {
  const tryouts = await getTryouts();

  return <DataTable data={tryouts} columns={columns} />;
}
