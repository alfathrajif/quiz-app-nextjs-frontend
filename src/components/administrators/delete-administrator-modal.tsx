import React, { useState } from "react";
import { Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoReload } from "react-icons/io5";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { softDeleteAdministrator } from "@/actions/user";

interface DeleteAdministratorModalProps {
  setIsOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
  uuid: string;
}

const DeleteAdministratorModal = ({
  setIsOpenPopover,
  uuid,
}: DeleteAdministratorModalProps) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      const result = await softDeleteAdministrator(uuid);

      if (result.error) {
        toast({
          title: "Gagal menghapus administrator",
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.refresh();
        setIsOpenPopover(false);
        setIsOpenDialog(false);
        toast({
          title: "Berhasil menghapus administrator",
          description: "Administrator berhasil dihapus",
          variant: "default",
        });
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
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="justify-between w-full hover:bg-accent text-destructive hover:text-destructive">
          Delete
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 gap-y-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader className="p-6">
          <DialogTitle className="mb-2">Confirm Delete</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Are you sure you want to delete this administrator? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-6 pt-0 gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setIsOpenDialog(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            onClick={handleDelete}
            className="w-full"
            disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <IoReload className="mr-2 h-4 w-4 animate-spin" />
                Memuat...
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAdministratorModal;
