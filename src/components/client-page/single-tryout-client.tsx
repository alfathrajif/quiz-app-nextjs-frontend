"use client";
import { useTryoutStore } from "@/hooks/zustand/tryout-store";
import { Tryout } from "@/types/tryout";
import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { DataTable } from "@/components/section/table/data-table";
import { columns } from "@/components/section/table/column";

export default function SingleTryoutClient({ tryout }: { tryout: Tryout }) {
  const { setTryout } = useTryoutStore(
    useShallow((state) => ({
      setTryout: state.setTryout,
    }))
  );

  useEffect(() => {
    setTryout(tryout);
  }, [setTryout, tryout]);

  return (
    <div>
      <div className="mb-10">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {tryout.title}
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          {tryout.description}
        </p>
      </div>
      <DataTable data={tryout.sections} columns={columns} />
    </div>
  );
}
