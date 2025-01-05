"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const searchParams = useSearchParams();
  const queryQuiz = searchParams.get("quiz");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Cari berdasarkan soal quiz..."
          value={(table.getColumn("text")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("text")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3">
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-x-1">
        <Link href={`edit?quiz=${queryQuiz}`}>
          <Button size="sm" className="text-xs gap-x-1">
            <Plus className="w-4 h-4" />
            Edit Quiz
          </Button>
        </Link>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
