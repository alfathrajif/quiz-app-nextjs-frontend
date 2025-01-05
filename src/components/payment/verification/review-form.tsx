import { PaymentReceipt } from "@/types/payment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import { toast } from "@/hooks/use-toast";
import { updatePaymentReceipt } from "@/actions/payment";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  status: z.string().min(1, {
    message: "Status is required",
  }),
  remarks: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

interface ReviewFormProps {
  receipt: PaymentReceipt;
  setIsOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewForm = ({ receipt, setIsOpenDialog }: ReviewFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: receipt.status || "submitted",
      remarks: receipt.remarks || "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      const payload = {
        ...values,
      };

      const result = await updatePaymentReceipt(receipt.uuid, payload);

      if (result.error) {
        toast({
          title: result.message,
          description: result.error,
          variant: "destructive",
        });
        setIsLoading(false);
      } else {
        setIsOpenDialog(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
        router.refresh();
        toast({
          description: "Pembayaran berhasil ditinjau",
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
      console.log(err.message);
    }
  };

  let statusTitle: string = "";
  switch (receipt.status) {
    case "submitted":
      statusTitle = "Menunggu Persetujuan";
      break;
    case "approved":
      statusTitle = "Disetujui";
      break;
    case "rejected":
      statusTitle = "Ditolak";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="capitalize">
                    <SelectValue placeholder={statusTitle} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="submitted">
                    Menunggu Persetujuan
                  </SelectItem>
                  <SelectItem value="approved">Disetujui</SelectItem>
                  <SelectItem value="rejected">Ditolak</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remarks"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Catatan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tambahkan catatan untuk pembayaran ini"
                  className="resize-none py-2.5"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpenDialog(false)}>
            Tutup
          </Button>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <IoReload className="mr-2 h-4 w-4 animate-spin" />
                Memuat...
              </div>
            ) : (
              "Tinjau"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
