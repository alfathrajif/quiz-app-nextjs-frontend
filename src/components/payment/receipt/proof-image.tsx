import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { API_URL } from "@/constants";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";

const ProofImage = ({ imageUrl }: { imageUrl: string }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger className="underline hover:no-underline text-muted-foreground">
        Lihat
      </DialogTrigger>
      <DialogContent
        className="h-[500px] p-0 w-[277px] mx-auto"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader>
          <DialogTitle />
          <DialogDescription />
          <div className="rounded-lg overflow-hidden">
            <Image
              src={`${API_URL}/images/receipts/${imageUrl}`}
              alt={imageUrl}
              loading="eager"
              width={277}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </DialogHeader>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpenDialog(false)}
          className="absolute -top-8 -right-8 border-none bg-transparent hover:bg-transparent hover:text-muted-foreground">
          <IoClose className="min-w-6 min-h-6" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProofImage;
