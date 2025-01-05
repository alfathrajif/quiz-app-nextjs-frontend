import { getPaymentVerifications } from "@/actions/payment";
import { columns } from "@/components/payment/verification/table/column";
import { DataTable } from "@/components/payment/verification/table/data-table";
import React from "react";

export default async function PaymentVerification() {
  const paymentVerifications = await getPaymentVerifications();

  return <DataTable data={paymentVerifications} columns={columns} />;
}
