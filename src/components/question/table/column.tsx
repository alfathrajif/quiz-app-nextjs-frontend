"use client";
import { Question } from "@/types/question";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Choice } from "@/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="#"
        className="ml-2.5 text-xs"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2 min-h-11 items-center">
          <span className="font-medium">{row.getValue("number")}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Soal Quiz" />
    ),
    cell: ({ row }) => {
      const text: string = row.original.text;

      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">{text}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "choices",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pilihan Ganda" />
    ),
    cell: ({ row }) => {
      const choices: Choice[] = row.getValue("choices") || [];

      return (
        <div className="ml-3 flex flex-wrap gap-1 py-2">
          {choices.map((choice: Choice, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className={`font-medium whitespace-nowrap rounded-none ${
                choice.is_correct && "border-green-700 text-green-700"
              }`}>
              {choice.text}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "explanation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Penjelasan" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">{row.getValue("explanation")}</span>
        </div>
      );
    },
  },
];
