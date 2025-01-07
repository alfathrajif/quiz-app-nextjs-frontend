"use client";
import { adminRoutes } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const { management, monitoring, payment } = adminRoutes;

  return (
    <div className="flex gap-x-5 wrapper py-10 relative">
      <div
        className={`hidden w-[200px] xl:w-[280px] bg-background content-area top-16 md:flex flex-col gap-y-7 py-10 fixed`}>
        <div className="flex flex-col gap-y-2">
          <div className="text-sm p-1 px-2 font-semibold">Management</div>
          {management.map((route, index) => (
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
          <div className="text-sm p-1 px-2 font-semibold">Monitoring</div>
          {monitoring.map((route, index) => (
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
          <div className="text-sm p-1 px-2 font-semibold">Payments</div>
          {payment.map((route, index) => (
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

export default AdminLayout;
