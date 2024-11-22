"use client";
import React, { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { PaymentRequest } from "@/types/payment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
import { Card } from "@/components/ui/card";
import Dropzone from "react-dropzone";
import { BiSolidImageAdd } from "react-icons/bi";
import Image from "next/image";
import { IoReload } from "react-icons/io5";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPaymentReceipt, uploadReceiptImage } from "@/actions/payment";

const PaymentReceipt = ({
  paymentRequest,
  setIsOpenDialogPaymentReceipt,
}: {
  paymentRequest: PaymentRequest;
  setIsOpenDialogPaymentReceipt: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!file) {
        setIsLoading(false);
        throw new Error("Please upload an image file");
      }

      const formData = new FormData();
      formData.append("file_image", file);
      const uploadImage = await uploadReceiptImage(formData);

      const payload = {
        payment_request_uuid: paymentRequest.uuid,
        upload_date: new Date(),
        payment_date: new Date(),
        amount_paid: paymentRequest.amount,
        payment_proof_image: uploadImage.filename,
        status: "submitted",
      };

      const result = await createPaymentReceipt(payload);

      if (result.error) {
        toast({
          title: result.message,
          description: result.error,
          variant: "destructive",
        });
        setIsLoading(false);
      } else {
        toast({
          description: result.message,
          variant: "default",
        });
        setTimeout(() => {
          setIsOpenDialogPaymentReceipt(false);
          setTimeout(() => {
            setIsOpenDialog(false);
            setTimeout(() => {
              setIsLoading(false);
            }, 300);
          }, 300);
        }, 300);
        router.push(`/u/payment-history`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast({
        title: "An unexpected error occurred",
        description: err.message,
        variant: "destructive",
      });
      console.log(err.message);
    }
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button className="w-full">Kirim Bukti</Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 gap-y-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl">
            {formatCurrency(paymentRequest.amount, "IDR", "id-ID")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Lakukan pembayaran sebelum{" "}
            {moment(paymentRequest.due_date).format("LL")}
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="p-6 space-y-4">
          <Dropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="w-full space-y-4">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Button
                    size="lg"
                    variant="secondary"
                    type="button"
                    className="w-full h-12">
                    <BiSolidImageAdd className="w-4 h-4" />
                    <span className="ml-1">Upload Bukti Transfer</span>
                  </Button>
                </div>
              </section>
            )}
          </Dropzone>
          <div className="flex gap-x-4">
            <Card className="space-y-4 p-4 border-none w-full">
              <div className="text-base font-semibold">Informasi Pembayar</div>
              <div className="space-y-2.5 font-light">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground min-w-[230px]">
                    Nama
                  </div>
                  <div className="text-sm capitalize mb-0.5">
                    {paymentRequest.user.name}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground min-w-[230px]">
                    Nomor Telepon / WhatsApp
                  </div>
                  <div className="text-sm mb-0.5">
                    {paymentRequest.user.phone}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground min-w-[230px]">
                    Email
                  </div>
                  <div className="text-sm mb-0.5">
                    {paymentRequest.user.email}
                  </div>
                </div>
              </div>
            </Card>
            {file && (
              <div className="h-[300px] min-w-[166px] mx-auto rounded-lg overflow-hidden">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <Separator />
        <DialogFooter className="p-6">
          <div className="ml-auto flex gap-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpenDialog(false)}>
              Tutup
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full"
              disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <IoReload className="mr-2 h-4 w-4 animate-spin" />
                  Memuat...
                </div>
              ) : (
                "Kirim"
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentReceipt;
