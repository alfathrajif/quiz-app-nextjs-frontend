import React from "react";

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <div className="mb-6 space-y-5">
      <div className="text-center text-3xl font-semibold">{title}</div>
      <p className="text-center text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default AuthHeader;
