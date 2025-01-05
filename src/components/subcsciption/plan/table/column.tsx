"use client";
// import { Section } from "@/types/section";
import { ColumnDef } from "@tanstack/react-table";
// import ColumnActions from "../column-actions";
import { DataTableColumnHeader } from "./data-table-column-header";
import moment from "moment";
import { SubscriptionPlanAdmin } from "@/types/subscription-plan";
import ColumnActions from "../column-actions";

export const columns: ColumnDef<SubscriptionPlanAdmin>[] = [
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
      <DataTableColumnHeader column={column} title="Paket" />
    ),
    cell: ({ row }) => {
      const description: string = row.original.description;
      return (
        <div className="ml-3 py-1">
          <div className="font-medium capitalize">{row.getValue("name")}</div>
          <p className="text-xs font-light text-muted-foreground/70 line-clamp-1">
            {description}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Harga & Durasi" />
    ),
    cell: ({ row }) => {
      const price: number = row.getValue("price");
      let duration: string = row.original.duration;
      let title: string;

      switch (duration) {
        case "monthly":
          duration = "/monthly";
          break;
        case "weekly":
          duration = "/weekly";
          break;
        case "infinite":
          duration = "";
          break;
        default:
          break;
      }

      switch (price) {
        case 0:
          title = "Gratis!";
          break;
        default:
          title = price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          });
          break;
      }

      return (
        <div className="ml-3 flex space-x-2">
          <div>
            <span className="font-medium">{title} </span>
            <span className="text-xs text-muted-foreground">{duration}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "subscriptions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah Pelanggan" />
    ),
    cell: ({ row }) => {
      const subscriptions: number = row.original.subscriptions.length;
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">{subscriptions}</span>
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
      const rowData: SubscriptionPlanAdmin = row.original;
      return <ColumnActions rowData={rowData} />;
    },
  },
];
