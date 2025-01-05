import { getPaymentRequests } from "@/actions/payment";
import { columns } from "@/components/payment/request/table/column";
import { DataTable } from "@/components/payment/request/table/data-table";

const MakePayment = async () => {
  const paymentRequests = await getPaymentRequests();
  return <DataTable data={paymentRequests} columns={columns} />;
};

export default MakePayment;
