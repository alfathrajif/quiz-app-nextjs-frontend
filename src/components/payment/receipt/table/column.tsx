"use client";
import { PaymentReceipt } from "@/types/payment";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { User } from "@/types/user";
import ProofImage from "@/components/payment/receipt/proof-image";

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
    accessorKey: "name",
    accessorFn: (row) => row.payment_request.subscription_plan.name,
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
    accessorKey: "reviewed_by",
    accessorFn: (row) => row.reviewed_by,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ditinjau oleh" />
    ),
    cell: ({ row }) => {
      const reviewedBy: User = row.getValue("reviewed_by");

      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {reviewedBy ? (
              <span>Administrator Kalkulus.id</span>
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "review_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal Review" />
    ),
    cell: ({ row }) => {
      const reviewDate = row.getValue("review_date");

      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {reviewDate ? (
              moment(reviewDate).format("DD MMM YYYY")
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Catatan" />
    ),
    cell: ({ row }) => {
      return (
        <div className="ml-3 flex space-x-2">
          <span className="font-medium">
            {row.getValue("remarks") ? (
              row.getValue("remarks")
            ) : (
              <span className="text-muted-foreground">-</span>
            )}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_proof_image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bukti Transfer" />
    ),
    cell: ({ row }) => {
      const imageUrl: string = row.getValue("payment_proof_image");

      return (
        <div className="ml-3 flex space-x-2">
          <ProofImage imageUrl={imageUrl} />
        </div>
      );
    },
  },
];
