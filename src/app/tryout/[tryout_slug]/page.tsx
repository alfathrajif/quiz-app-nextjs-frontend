import { getTryout } from "@/actions/tryout";
import UserTryoutSingle from "@/components/client-page/user-tryout-single";
import React from "react";

export default async function SingleTryout({
  params,
}: {
  params: { tryout_slug: string };
}) {
  const tryout = await getTryout(params.tryout_slug);

  return <UserTryoutSingle tryout={tryout} />;
}
