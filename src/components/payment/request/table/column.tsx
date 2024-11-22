"use client";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { PaymentRequest } from "@/types/payment";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { DataTableColumnHeader } from "./data-table-column-header";
import PaymentReceipt from "../../receipt/payment-receipt";

export const columns: ColumnDef<PaymentRequest>[] = [
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
    accessorFn: (row) => row.subscription_plan.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paket" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium capitalize">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Biaya" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {formatCurrency(row.getValue("amount"), "IDR", "id-ID")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Jatuh Tempo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {moment(row.getValue("due_date")).format("DD MMM YYYY")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "notes",
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
        case "cancelled":
          title = "Dibatalkan";
          break;
        case "paid":
          title = "Lunas";
          break;
        case "pending":
          title = "Menunggu Pembayaran";
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
            className={`capitalize ${
              row.getValue("status") === "cancelled"
                ? "text-red-500/60 border-red-500/40"
                : row.getValue("status") === "paid"
                ? "text-green-500/60 border-green-500/40"
                : row.getValue("status") === "pending"
                ? "text-yellow-500/60 border-yellow-500/40"
                : row.getValue("status") === "expired"
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
    accessorKey: "action",
    header: () => <></>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      const paymentRequest = row.original;

      return (
        <div className="ml-3 flex space-x-2">
          {status === "pending" ? (
            <PaymentReceipt paymentRequest={paymentRequest} />
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      );
    },
  },
];
