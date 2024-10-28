import Link from "next/link";
import React from "react";

interface AuthFooterProps {
  linkTitle: string;
  linkUrl: string;
  description: string;
}

const AuthFooter = ({ linkTitle, linkUrl, description }: AuthFooterProps) => {
  return (
    <div className="text-center text-sm text-muted-foreground">
      {description}{" "}
      <Link href={linkUrl} className="underline hover:no-underline">
        {linkTitle}
      </Link>
    </div>
  );
};

export default AuthFooter;
