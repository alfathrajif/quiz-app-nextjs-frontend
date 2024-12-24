import { getPaymentLogs } from "@/actions/payment";
import { columns } from "@/components/payment/logs/table/column";
import { DataTable } from "@/components/payment/logs/table/data-table";
import React from "react";

export default async function PaymentLogs() {
  const paymentLogs = await getPaymentLogs();

  return <DataTable data={paymentLogs} columns={columns} />;
}
