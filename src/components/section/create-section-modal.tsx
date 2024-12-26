import { AuthContext } from "@/app/(auth)/auth-context";
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
import { toast } from "@/hooks/use-toast";
import { useTryoutStore } from "@/hooks/zustand/tryout-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoReload } from "react-icons/io5";
import { z } from "zod";
import { useShallow } from "zustand/react/shallow";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createSection } from "@/actions/section";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nama sesi wajib diisi",
  }),
  description: z.string().min(1, {
    message: "Deskripsi sesi wajib diisi",
  }),
});

type FormSchemaType = z.infer<typeof formSchema>;

const CreateTryoutModal = () => {
  const { profile } = useContext(AuthContext);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { tryout } = useTryoutStore(
    useShallow((state) => ({
      tryout: state.tryout,
    }))
  );

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      setIsLoading(true);

      const payload = {
        ...values,
        tryout_uuid: tryout?.uuid || "",
        user_uuid: profile?.uuid,
      };

      const result = await createSection(payload);

      if (result.error) {
        toast({
          title: "Gagal menambahkan tahapan",
          description: result.error,
          variant: "destructive",
        });
      } else {
        router.refresh();
        setIsOpenDialog(false);
        toast({
          title: "Tahapan berhasil ditambahkan",
          description: "Tahapan baru berhasil ditambahkan",
          variant: "default",
        });
        form.reset();
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
        <Button size="sm" className="text-xs gap-x-1">
          <Plus className="w-4 h-4" />
          Tambah Tahapan
        </Button>
      </DialogTrigger>
      <DialogContent
        className="p-0 gap-y-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogHeader className="p-6">
          <DialogTitle className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Tambah Tahapan
          </DialogTitle>
          <DialogDescription className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
            Silakan isi form berikut untuk menambahkan tahapan baru.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 pt-0 space-y-6">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>
                      Nama<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan name tahapan"
                        {...field}
                        className={
                          form.formState.errors?.name &&
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
                        placeholder="Masukkan deskripsi tahapan"
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
                  "Tambah"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTryoutModal;
