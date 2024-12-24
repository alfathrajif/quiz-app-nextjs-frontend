"use client";
import { PaymentLog } from "@/types/payment";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Subscription } from "@/types/subscription";
import moment from "moment";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<PaymentLog>[] = [
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
    accessorFn: (row) => row.user.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pengguna" />
    ),
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      const email: string = row.original.user.email;

      return (
        <div className="ml-3 flex items-center space-x-2 py-1.5">
          <Avatar className="h-10 w-10">
            <AvatarImage src="#" />
            <AvatarFallback>
              <UserIcon className="w-5 h-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex gap-x-2 items-center">
              <div className="font-semibold">{name}</div>
            </div>
            <div className="text-xs text-muted-foreground font-light">
              {email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "subscription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paket" />
    ),
    cell: ({ row }) => {
      const subscription: Subscription = row.getValue("subscription");

      return (
        <div className="ml-3">
          <div>
            {formatCurrency(
              subscription.subscription_plan.price,
              "IDR",
              "id-ID"
            )}
          </div>
          <div className="text-xs text-muted-foreground font-light capitalize">
            {subscription.subscription_plan.name}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verifikasi" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {moment(row.getValue("payment_date")).format("DD MMM YYYY")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    accessorFn: (row) => row.subscription.status,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      let title;
      switch (status.toLowerCase()) {
        case "active":
          title = "Aktif";
          break;
        case "expired":
          title = "Kadaluarsa";
          break;
        default:
          break;
      }

      return (
        <div className="ml-3 flex space-x-2">
          <Badge
            variant="outline"
            className={`capitalize whitespace-nowrap ${
              status === "active"
                ? "text-green-500/60 border-green-500/40"
                : status === "expired"
                ? "text-gray-500/60 border-gray-500/40"
                : ""
            }`}>
            {title}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "end_date",
    accessorFn: (row) => row.subscription.end_date,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Berakhir" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {moment(row.getValue("end_date")).format("DD MMM YYYY")}
          </span>
        </div>
      );
    },
  },
];
