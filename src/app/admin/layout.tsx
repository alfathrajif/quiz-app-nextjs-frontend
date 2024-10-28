"use client";
import { adminRoutes } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname().split("/")[2];
  const { management, monitoring } = adminRoutes;

  return (
    <div className="flex gap-x-5 wrapper py-10">
      <div className="w-[280px] flex flex-col gap-y-7">
        <div className="flex flex-col gap-y-2">
          <div className="text-sm p-1 px-2 font-semibold">Management</div>
          {management.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              className={`text-sm p-1 px-2 hover:underline ${
                route.path.includes(pathname)
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
                route.path.includes(pathname)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}>
              {route.title}
            </Link>
          ))}
        </div>
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
