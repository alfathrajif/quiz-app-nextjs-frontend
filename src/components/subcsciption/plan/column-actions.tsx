import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SubscriptionPlanAdmin } from "@/types/subscription-plan";
import { Button } from "@/components/ui/button";
import DeleteSubscriptionPlanModal from "./delete-subscription-plan-modal";
import EditSubscriptionPlanModal from "./edit-subscription-plan-modal";

const ColumnActions = ({ rowData }: { rowData: SubscriptionPlanAdmin }) => {
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
          <EditSubscriptionPlanModal
            setIsOpenPopover={setIsOpenPopover}
            rowData={rowData}
          />
          <DeleteSubscriptionPlanModal
            setIsOpenPopover={setIsOpenPopover}
            uuid={rowData.uuid}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColumnActions;
