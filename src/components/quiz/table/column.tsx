"use client";
import { Quiz } from "@/types/quiz";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Link from "next/link";
import { DataTableColumnHeader } from "./data-table-column-header";
import ColumnActions from "../column-actions";

interface TableMeta {
  sectionSlug: string;
}

export const columns: ColumnDef<Quiz>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Judul" />
    ),
    cell: ({ row, table }) => {
      const slug = row.original.slug;
      const description = row.original.description;
      const sectionSlug: string =
        (table.options.meta as TableMeta)?.sectionSlug || "";

      return (
        <div className="ml-3 py-1 max-w-sm">
          <Link
            href={`${sectionSlug}/view?quiz=${slug}`}
            className="hover:underline">
            {row.getValue("title")}
          </Link>
          <p className="text-sm font-light text-muted-foreground/70 line-clamp-1">
            {description}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "questions_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah Soal" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">{row.getValue("questions_count")}</span>
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
            {moment(row.getValue("created_at")).format("LL")}
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
            {moment(row.getValue("updated_at")).format("LL")}
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
    cell: ({ row, table }) => {
      const rowData: Quiz = row.original;
      const sectionSlug: string =
        (table.options.meta as TableMeta)?.sectionSlug || "";

      return <ColumnActions rowData={rowData} sectionSlug={sectionSlug} />;
    },
  },
];
