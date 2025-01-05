import React, { Fragment } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tryout } from "@/types/tryout";
import { Section } from "@/types/section";
import Link from "next/link";

interface TryoutListProps {
  tryouts: Tryout[];
}

export default function TryoutList({ tryouts }: TryoutListProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {tryouts.map((tryout) => (
        <div key={tryout.uuid} className="space-y-3">
          <Link href={`/tryout/${tryout.slug}`}>
            <Card className="flex flex-col justify-between p-6 gap-2 rounded-md hover:bg-background group">
              <CardHeader className="p-0">
                <CardTitle className="text-xl group-hover:text-primary">
                  {tryout.title}
                </CardTitle>
                <CardDescription className="text-sm font-light text-muted-foreground/70 line-clamp-1">
                  {tryout.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <div className="space-x-2 leading-tight">
            {tryout.sections.map((section: Section, index: number) => (
              <Fragment key={index}>
                <Link
                  href={`tryout/${tryout.slug}/${section.slug}`}
                  className="text-xs text-muted-foreground/70 hover:underline hover:text-primary/70">
                  {section.name}
                </Link>
                {index < tryout.sections.length - 1 && (
                  <span className="text-sm text-muted-foreground/50">
                    &bull;
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
