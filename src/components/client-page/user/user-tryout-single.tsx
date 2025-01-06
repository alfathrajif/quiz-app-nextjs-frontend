import { Tryout } from "@/types/tryout";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserTryoutSingle({ tryout }: { tryout: Tryout }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {tryout.sections.map((section) => (
          <Link key={section.uuid} href={`${tryout.slug}/${section.slug}`}>
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
    </div>
  );
}
