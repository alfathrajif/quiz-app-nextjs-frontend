import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteTryoutModal from "./delete-tryout-modal";
import EditTryoutModal from "./edit-tryout-modal";
import { Tryout } from "@/types/tryout";

const ColumnActions = ({ rowData }: { rowData: Tryout }) => {
  const [isOpenPopover, setIsOpenPopover] = React.useState(false);

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
          <EditTryoutModal
            setIsOpenPopover={setIsOpenPopover}
            rowData={rowData}
          />
          <DeleteTryoutModal
            setIsOpenPopover={setIsOpenPopover}
            uuid={rowData.uuid}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColumnActions;
