import React from "react";

interface AuthHeaderProps {
  title: string;
  description: string;
}

const AuthHeader = ({ title, description }: AuthHeaderProps) => {
  return (
    <div className="mb-6 space-y-2 mx-auto">
      <div className="text-center text-3xl font-bold">{title}</div>
      <p className="text-center text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default AuthHeader;
