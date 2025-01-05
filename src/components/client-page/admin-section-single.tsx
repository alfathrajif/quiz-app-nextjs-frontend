"use client";
import { useSectionStore } from "@/hooks/zustand/section-store";
import { Section } from "@/types/section";
import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { DataTable } from "../quiz/table/data-table";
import { columns } from "../quiz/table/column";

export default function AdminSingleSection({ section }: { section: Section }) {
  const { setSection } = useSectionStore(
    useShallow((state) => ({
      setSection: state.setSection,
    }))
  );

  useEffect(() => {
    setSection(section);
  }, [setSection, section]);

  return (
    <div>
      <div className="mb-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {section.name}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {section.description}
        </p>
      </div>
      <DataTable data={section.quizzes} columns={columns} />
    </div>
  );
}
