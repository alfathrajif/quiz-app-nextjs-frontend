"use client";
import { Section } from "@/types/section";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import ColumnActions from "../column-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Quiz } from "@/types/quiz";
import moment from "moment";

interface TableMeta {
  tryoutSlug: string;
}

export const columns: ColumnDef<Section>[] = [
  {
    accessorKey: "#",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="#"
        className="ml-2.5 text-xs"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2 min-h-8 items-center">
          <span className="font-medium">{row.index + 1}</span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row, table }) => {
      const slug = row.original.slug;
      const tryoutSlug: string =
        (table.options.meta as TableMeta)?.tryoutSlug || "";

      return (
        <div className="ml-3 py-1 max-w-sm">
          <Link href={`${tryoutSlug}/${slug}`} className="hover:underline">
            {row.getValue("name")}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Deskripsi" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 py-1 max-w-sm">
          <p className="text-sm font-light text-muted-foreground/70 line-clamp-1">
            {row.getValue("description")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "quizzes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah Quiz" />
    ),
    cell: ({ row }) => {
      const quizzes: Quiz[] = row.getValue("quizzes");
      return (
        <div className="ml-3 py-1">
          <span className="text-sm font-light text-muted-foreground/70">
            {quizzes.length}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dibuat Tanggal" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {moment(row.getValue("created_at")).format("DD MMM YYYY")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Diperbarui Tanggal" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {moment(row.getValue("updated_at")).format("DD MMM YYYY")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    enableSorting: false,
    enableHiding: false,
    header: () => <></>,
    cell: ({ row }) => {
      const rowData: Section = row.original;
      return <ColumnActions rowData={rowData} />;
    },
  },
];
