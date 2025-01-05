import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tryout } from "@/types/tryout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReload } from "react-icons/io5";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import { AuthContext } from "@/app/(auth)/auth-context";
import { editTryout } from "@/actions/tryout";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Judul tryout wajib diisi",
  }),
  description: z.string().min(1, {
    message: "Deskripsi tryout wajib diisi",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface EditTryoutModalProps {
  setIsOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
  rowData: Tryout;
}

const EditTryoutModal = ({
  setIsOpenPopover,
  rowData,
}: EditTryoutModalProps) => {
  const { profile } = useContext(AuthContext);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: rowData.title,
      description: rowData.description,
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);
      const payload = {
        ...values,
        user_uuid: profile?.uuid,
      };

      const result = await editTryout(payload, rowData.uuid);

      if (result.error) {
        toast({
          title: "Gagal mengubah tryout",
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.refresh();
        setIsOpenDialog(false);
        setIsOpenPopover(false);
        toast({
          title: "Tryout berhasil diubah",
          description: "Tryout berhasil diubah",
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
          className="justify-between w-full hover:bg-accent">
          Edit
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 gap-y-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader className="p-6">
          <DialogTitle className="mb-2">Edit Tryout</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Silakan ganti isi form berikut untuk mengubah tryout.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 pt-0 space-y-6">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Judul<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan judul tryout"
                        {...field}
                        className={
                          form.formState.errors?.title &&
                          "focus-visible:ring-destructive border-destructive"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Deskripsi<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan deskripsi tryout"
                        {...field}
                        className={
                          form.formState.errors?.description &&
                          "focus-visible:ring-destructive border-destructive"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpenDialog(false);
                  setIsOpenPopover(false);
                }}>
                Tutup
              </Button>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <IoReload className="mr-2 h-4 w-4 animate-spin" />
                    Memuat...
                  </div>
                ) : (
                  "Edit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTryoutModal;
