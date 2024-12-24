import { getSections } from "@/actions/section";
import SectionList from "@/components/tryout/section-list";
import React from "react";

export default async function SingleTryout({
  params,
}: {
  params: { tryout_slug: string };
}) {
  const sections = await getSections(params.tryout_slug);

  return <SectionList tryoutSlug={params.tryout_slug} sections={sections} />;
}
