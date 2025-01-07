import { getTryout } from "@/actions/tryout";
import AdminSingleTryout from "@/components/client-page/admin/tryout-single";
import { notFound } from "next/navigation";

export default async function SingleTryout({
  params,
}: {
  params: { tryout_slug: string };
}) {
  const tryout = await getTryout(params.tryout_slug);

  if (!tryout) {
    return notFound();
  }

  return <AdminSingleTryout tryout={tryout} />;
}
