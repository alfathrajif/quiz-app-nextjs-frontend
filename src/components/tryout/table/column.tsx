"use client";
import { Tryout } from "@/types/tryout";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import Link from "next/link";
import ColumnActions from "../column-actions";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Tryout>[] = [
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
        <div className="ml-3 flex space-x-2 items-center">
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
    cell: ({ row }) => {
      const slug = row.original.slug;

      return (
        <div className="ml-3 max-w-sm">
          <Link
            href={`/admin/tryout/${slug}`}
            className="hover:underline line-clamp-2">
            {row.getValue("title")}
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
        <div className="ml-3 max-w-sm">
          <p
            className="text-sm font-light text-muted-foreground/70 line-clamp-2"
            title={row.getValue("description")}>
            {row.getValue("description")}
          </p>
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
      const rowData: Tryout = row.original;
      return <ColumnActions rowData={rowData} />;
    },
  },
];
