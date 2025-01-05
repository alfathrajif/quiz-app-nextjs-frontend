"use client";
import { updatePaymentRequest } from "@/actions/payment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { PaymentRequest } from "@/types/payment";
import { Hash } from "lucide-react";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import PaymentReceiptForm from "./payment-receipt-form";

const PaymentReceipt = ({
  paymentRequest,
}: {
  paymentRequest: PaymentRequest;
}) => {
  const isInvoice = useSearchParams().has("invoice");
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isInvoice) {
      setTimeout(() => {
        setIsOpenDialog(true);
      }, 300);
    } else {
      setIsOpenDialog(false);
    }
  }, [router, isOpenDialog, paymentRequest.uuid, isInvoice]);

  const handleCancelled = async () => {
    try {
      setIsLoading(true);

      const result = await updatePaymentRequest(paymentRequest.uuid, {
        status: "cancelled",
      });

      if (result.error) {
        toast({
          title: result.message,
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.push("/u/make-payment");
        router.refresh();
        setTimeout(() => {
          setIsOpenDialog(false);
        }, 500);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "An unexpected error occurred",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <Dialog
      open={isOpenDialog}
      onOpenChange={() => {
        router.push(`/u/make-payment?invoice=${paymentRequest.uuid}`);
        setIsOpenDialog(true);
      }}>
      <DialogTrigger className="text-sm underline text-muted-foreground hover:no-underline">
        Bayar
      </DialogTrigger>
      <DialogContent
        className="p-0 gap-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader className="p-6">
          <DialogTitle className="flex items-center gap-x-2">
            <span className="text-xl font-bold">Tagihan</span>
            <div className="flex items-center text-base mt-0.5">
              <Hash className="w-4 h-4 text-muted-foreground mb-0.5" />
              <span className="text-blue-500 line-clamp-1">
                {paymentRequest.uuid}
              </span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-base uppercase">
            Paket {paymentRequest.subscription_plan.name}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="p-6 space-y-5">
          <div>
            <div className="text-3xl font-semibold mb-1">
              {formatCurrency(paymentRequest.amount, "IDR", "id-ID")}
            </div>
            <div className="text-sm text-muted-foreground">
              Lakukan pembayaran sebelum{" "}
              {moment(paymentRequest.due_date).format("LL")}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground mb-0.5">
              Pembayaran ke
            </div>
            <div className="text-base font-semibold capitalize">
              Kalkulus.id
            </div>
            <div className="text-sm text-muted-foreground">
              Rek. 7102384932438
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="text-sm text-muted-foreground mb-0.5">
              Pembayaran dari
            </div>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="text-sm text-muted-foreground min-w-[230px]">
                  Nama
                </div>
                <div className="text-sm capitalize mb-0.5">
                  {paymentRequest.user.name}
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm text-muted-foreground min-w-[230px]">
                  Nomor Telepon / WhatsApp
                </div>
                <div className="text-sm mb-0.5">
                  {paymentRequest.user.phone}
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm text-muted-foreground min-w-[230px]">
                  Email
                </div>
                <div className="text-sm mb-0.5">
                  {paymentRequest.user.email}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="text-sm text-muted-foreground mb-0.5">Catatan</div>
            {paymentRequest.notes ? (
              <div className="text-sm">{paymentRequest.notes}</div>
            ) : (
              <div className="text-sm text-muted-foreground">-</div>
            )}
          </div>
        </div>
        <Separator />
        <DialogFooter className="p-6 py-5 flex">
          <div className="flex gap-x-2 w-full">
            <Button
              variant="outline"
              onClick={() => router.push("/u/make-payment")}>
              Tutup
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancelled}
              disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <IoReload className="mr-2 h-4 w-4 animate-spin" />
                  Memuat...
                </div>
              ) : (
                "Batal"
              )}
            </Button>
            <PaymentReceiptForm paymentRequest={paymentRequest} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceipt;
