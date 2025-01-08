import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { Administrator } from "@/types/user";
import DeleteAdministratorModal from "./delete-administrator-modal";

const ColumnActions = ({ rowData }: { rowData: Administrator }) => {
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
          <DeleteAdministratorModal
            setIsOpenPopover={setIsOpenPopover}
            uuid={rowData.uuid}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColumnActions;
