import { Section } from "@/types/section";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionListProps {
  tryoutSlug: string;
  sections: Section[];
}

const SectionList = ({ tryoutSlug, sections }: SectionListProps) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {sections.map((section) => (
        <Link key={section.uuid} href={`${tryoutSlug}/${section.slug}`}>
          <Card className="flex flex-col justify-between p-6 gap-2 rounded-md hover:bg-background group">
            <CardHeader className="p-0">
              <CardTitle className="text-xl group-hover:text-primary">
                {section.name}
              </CardTitle>
              <CardDescription className="text-sm font-light text-muted-foreground/70 line-clamp-1">
                {section.description}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SectionList;
