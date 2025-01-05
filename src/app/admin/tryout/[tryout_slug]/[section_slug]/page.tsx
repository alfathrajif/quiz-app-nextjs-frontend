import { getSection } from "@/actions/section";
import AdminSingleSection from "@/components/client-page/admin-section-single";
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

  return <AdminSingleSection section={section} />;
}
