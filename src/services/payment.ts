import instance from "@/lib/axios/instance";
import {
  CreatePaymentReceipt,
  CreatePaymentRequest,
  UpdatePaymentRequest,
} from "@/types/payment";

const paymentService = {
  createRequest: (payment: CreatePaymentRequest) =>
    instance
      .post("/payment-requests", payment)
      .then((response) => response)
      .catch((err) => err.response),
  updateRequest: (
    paymentRequestUuid: string,
    paymentRequest: Partial<UpdatePaymentRequest>
  ) =>
    instance
      .patch(`/payment-requests/${paymentRequestUuid}`, paymentRequest)
      .then((response) => response)
      .catch((err) => err.response),
  createReceipt: (payment: CreatePaymentReceipt) =>
    instance
      .post("/payment-receipts", payment)
      .then((response) => response.data)
      .catch((err) => err.response),
  updateReceipt: (
    paymentReceiptUuid: string,
    receipt: { status: string; remarks?: string }
  ) =>
    instance
      .patch(`/payment-receipts/${paymentReceiptUuid}`, receipt)
      .then((response) => response)
      .catch((err) => err.response),
};

export default paymentService;
