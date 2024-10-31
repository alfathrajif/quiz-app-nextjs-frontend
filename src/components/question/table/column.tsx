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
      <DataTableColumnHeader column={column} title="Question" />
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
      <DataTableColumnHeader column={column} title="Choices" />
    ),
    cell: ({ row }) => {
      const choices: Choice[] = row.getValue("choices") || [];

      return (
        <div className="ml-3 flex space-x-2">
          {choices.map((choice: Choice, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className={`font-medium whitespace-nowrap ${
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
      <DataTableColumnHeader column={column} title="Explanation" />
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
