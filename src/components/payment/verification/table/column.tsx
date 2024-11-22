"use client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { formatCurrency } from "@/lib/utils";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import Review from "../review";
import { PaymentReceipt } from "@/types/payment";

export const columns: ColumnDef<PaymentReceipt>[] = [
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
    accessorKey: "user",
    accessorFn: (row) => row.payment_request.user,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pengguna" />
    ),
    cell: ({ row }) => {
      const user: User = row.getValue("user");

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
              <div className="font-semibold">{user?.name}</div>
            </div>
            <div className="text-xs text-muted-foreground font-light">
              {user.email}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    accessorFn: (row) => row.payment_request.subscription_plan.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paket" />
    ),
    cell: ({ row }) => {
      const paketName: string = row.getValue("name");
      const amount: number = row.original.amount_paid;

      return (
        <div className="ml-3">
          <div>{formatCurrency(amount, "IDR", "id-ID")}</div>
          <div className="text-xs text-muted-foreground font-light capitalize">
            {paketName}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Pembayaran" />
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
    accessorKey: "notes",
    accessorFn: (row) => row.payment_request.notes,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Catatan" />
    ),
    cell: ({ row }) => {
      const notes = row.getValue("notes");

      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {notes ? (
              <span>{String(notes)}</span>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      let title;
      switch (status.toLowerCase()) {
        case "submitted":
          title = "Menunggu Konfirmasi";
          break;
        case "approved":
          title = "Disetujui";
          break;
        case "rejected":
          title = "Ditolak";
          break;
        default:
          break;
      }

      return (
        <div className="ml-3 flex space-x-2">
          <Badge
            variant="outline"
            className={`capitalize whitespace-nowrap ${
              row.getValue("status") === "rejected"
                ? "text-red-500/60 border-red-500/40"
                : row.getValue("status") === "approved"
                ? "text-green-500/60 border-green-500/40"
                : row.getValue("status") === "submitted"
                ? "text-yellow-500/60 border-yellow-500/40"
                : ""
            }`}>
            {title}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "action",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aksi" />
    ),
    cell: ({ row }) => {
      const paymentVerification: PaymentReceipt = row.original;

      return (
        <div className="ml-3 flex space-x-2">
          <Review data={paymentVerification} />
        </div>
      );
    },
  },
];
