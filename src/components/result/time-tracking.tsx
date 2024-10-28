import moment from "moment";
import React from "react";
import { Separator } from "@/components/ui/separator";

const TimeTracking = ({ title, time }: { title: string; time: Date }) => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <div className="text-xl font-medium tracking-wider w-fit flex items-center">
        {title}
      </div>
      <Separator
        orientation="vertical"
        className="border-foreground h-6 mx-1 border"
      />
      <div className="text-xl text-muted-foreground">
        {moment(time).format("LTS")}
      </div>
    </div>
  );
};

export default TimeTracking;
