"use client";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "./layout.module.css";
import { userRoutes } from "@/constants";
import Link from "next/link";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();

  const { dashboard, exams, results, payments } = userRoutes;

  return (
    <div className="flex gap-x-5 wrapper py-10 relative">
      <div
        className={`hidden w-[200px] xl:w-[280px] bg-background content-area top-16 md:flex flex-col gap-y-7 py-10 fixed`}>
        <div className="flex flex-col gap-y-2">
          <Link
            href={dashboard.path}
            className={`text-sm p-1 px-2 hover:underline ${
              pathname.startsWith(dashboard.path)
                ? "text-primary"
                : "text-muted-foreground"
            }`}>
            {dashboard.title}
          </Link>
        </div>
        <div className="flex flex-col gap-y-2">
          {exams.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              className={`text-sm p-1 px-2 hover:underline ${
                pathname.startsWith(route.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}>
              {route.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          {results.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              className={`text-sm p-1 px-2 hover:underline ${
                pathname.startsWith(route.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}>
              {route.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-y-2">
          {payments.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              className={`text-sm p-1 px-2 hover:underline ${
                pathname.startsWith(route.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}>
              {route.title}
            </Link>
          ))}
        </div>
      </div>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
