import { getPaymentReceipts } from "@/actions/payment";
import { columns } from "@/components/payment/receipt/table/column";
import { DataTable } from "@/components/payment/receipt/table/data-table";
import React from "react";

const PaymentHistory = async () => {
  const paymentReceipts = await getPaymentReceipts();

  return <DataTable data={paymentReceipts} columns={columns} />;
};

export default PaymentHistory;
