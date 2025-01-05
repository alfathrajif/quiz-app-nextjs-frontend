import { getSection } from "@/actions/section";
import UserSectionSingle from "@/components/client-page/user-section-single";
import React from "react";

export default async function SingleSection({
  params,
}: {
  params: { cluster_slug: string };
}) {
  const section = await getSection(params.cluster_slug);

  return <UserSectionSingle section={section} />;
}
