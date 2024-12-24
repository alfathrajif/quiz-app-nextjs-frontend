import { getSection } from "@/actions/section";
import SingleSectionClient from "@/components/client-page/single-section-client";
import { notFound } from "next/navigation";
import React from "react";

export default async function SingleSection({
  params,
}: {
  params: { section_slug: string };
}) {
  const section = await getSection(params.section_slug);

  if (!section) {
    return notFound();
  }

  return <SingleSectionClient section={section} />;
}
