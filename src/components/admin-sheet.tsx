import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BiMenuAltLeft } from "react-icons/bi";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { adminRoutes } from "@/constants";
import Link from "next/link";
import { useEffect, useState } from "react";

const AdminSheet = () => {
  const pathname = usePathname().split("/")[2];
  const { management, monitoring, payment } = adminRoutes;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="md:hidden -ml-2 border-none hover:bg-transparent bg-transparent">
          <BiMenuAltLeft className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-y-7 py-6">
        <SheetHeader>
          <SheetTitle className="text-left">
            <div className="pl-2">
              <h1 className="text-xl font-bold">Quiz</h1>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-y-2">
          <div className="text-sm p-1 px-2 font-semibold">Management</div>
          {management.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              onClick={() => {
                setTimeout(() => {
                  setIsOpen(false);
                }, 300);
              }}
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
              onClick={() => {
                setTimeout(() => {
                  setIsOpen(false);
                }, 300);
              }}
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
          <div className="text-sm p-1 px-2 font-semibold">Pembayaran</div>
          {payment.map((route, index) => (
            <Link
              key={index}
              href={route.path}
              onClick={() => {
                setTimeout(() => {
                  setIsOpen(false);
                }, 300);
              }}
              className={`text-sm p-1 px-2 hover:underline ${
                route.path.includes(pathname)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}>
              {route.title}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminSheet;
