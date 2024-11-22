import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserIcon } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";
import { API_URL } from "@/constants";
import ReviewForm from "./review-form";
import { PaymentReceipt } from "@/types/payment";

interface ReviewProps {
  data: PaymentReceipt;
}

const Review = ({ data }: ReviewProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { user, subscription_plan, notes } = data.payment_request;

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger className="underline hover:no-underline text-muted-foreground">
        Tinjau
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="w-fit max-w-fit">
        <div className="flex gap-x-6">
          <div className="min-w-[277px] max-w-[277px] border rounded-lg overflow-hidden">
            <Image
              src={`${API_URL}/images/receipts/${data.payment_proof_image}`}
              alt={data.payment_proof_image}
              width={277}
              height={500}
              className="w-auto h-full object-cover"
            />
          </div>
          <div className="w-full space-y-8">
            <div className="space-y-4">
              <DialogHeader className="flex space-y-0 items-center gap-x-3 flex-row">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="#" />
                  <AvatarFallback>
                    <UserIcon className="w-5 h-5 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="mb-0.5">
                  <DialogTitle>
                    <div className="font-semibold">{user.name}</div>
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground font-light whitespace-nowrap">
                    {user.email} - {user?.phone?.replace(/\s+/g, "")}
                  </DialogDescription>
                </div>
              </DialogHeader>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Paket Premium
                </div>
                <div className="font-medium">
                  <span>
                    {subscription_plan.name === "premium"
                      ? formatCurrency(subscription_plan.price, "IDR", "id-ID")
                      : "Gratis!"}{" "}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {(subscription_plan.duration === "weekly" && "/minggu") ||
                      (subscription_plan.duration === "monthly" && "/bulan") ||
                      (subscription_plan.duration === "yearly" && "/tahun")}
                  </span>
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Tanggal Pembayaran
                </div>
                <div className="font-medium">
                  {moment(data.payment_date).format("DD MMM YYYY")}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Catatan Pembayaran
                </div>
                <div>
                  <span className="font-medium">
                    {notes ? (
                      <span>{String(notes)}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xl font-bold mb-2">Peninjauan</div>
              <ReviewForm receipt={data} setIsOpenDialog={setIsOpenDialog} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Review;
