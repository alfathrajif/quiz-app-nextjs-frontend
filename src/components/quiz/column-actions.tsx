import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteQuizModal from "./delete-quiz-modal";
import { Quiz } from "@/types/quiz";
import { Pencil } from "lucide-react";
import Link from "next/link";

const ColumnActions = ({
  rowData,
  sectionSlug,
}: {
  rowData: Quiz;
  sectionSlug: string;
}) => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
            <BsThreeDotsVertical className="text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="p-1 w-40">
          <Button
            asChild
            variant="ghost"
            className="justify-between w-full hover:bg-accent">
            <Link href={`${sectionSlug}/edit?quiz=${rowData.slug}`}>
              Edit
              <Pencil className="w-4 h-4" />
            </Link>
          </Button>
          <DeleteQuizModal
            setIsOpenPopover={setIsOpenPopover}
            uuid={rowData.uuid}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColumnActions;
