import SubscriptionAlert from "@/components/subcsciption/subscription-alert";
import React from "react";

const TryoutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="wrapper py-10 space-y-10">
      <SubscriptionAlert />
      {children}
    </div>
  );
};

export default TryoutLayout;
