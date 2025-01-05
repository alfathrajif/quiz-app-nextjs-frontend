import { getTryout } from "@/actions/tryout";
import SingleTryoutClient from "@/components/client-page/single-tryout-client";
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

  return <SingleTryoutClient tryout={tryout} />;
}
