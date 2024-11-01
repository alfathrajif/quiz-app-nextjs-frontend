import Link from "next/link";
import React from "react";

const Brand = ({ href }: { href: string }) => {
  return (
    <Link href={href} className="hidden md:block">
      <h1 className="text-xl font-bold">Kalkulus.id</h1>
    </Link>
  );
};

export default Brand;
