"use client";
import { logout } from "@/actions/auth";
import { AuthContext } from "@/app/(auth)/auth-context";
import { Button } from "@/components/ui/button";
import { unauthenticatedRoutes } from "@/constants";
import { LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, profile } = useContext(AuthContext);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const onLogout = async () => {
    await logout();
  };

  const isUnauthenticatedRoute = unauthenticatedRoutes.some((route) =>
    pathname.startsWith(route.path)
  );

  if (isUnauthenticatedRoute) return null;

  return (
    <header className="flex w-full items-center h-16 border-b">
      <div className="wrapper flex items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">Quiz</h1>
        </Link>
        <div className="ml-auto flex items-center gap-x-2">
          {!isAuthenticated ? (
            <div className="flex gap-x-0.5">
              {unauthenticatedRoutes.map((route, index) => (
                <Link
                  key={index}
                  href={route.path}
                  className="h-9 flex items-center px-3 rounded-md hover:bg-muted">
                  {route.title}
                </Link>
              ))}
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer h-9 w-9">
                  <AvatarImage src="#" />
                  <AvatarFallback>
                    <User className="w-5 h-5 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-56" align="end">
                <DropdownMenuLabel>
                  {profile.role.name === "admin" ? (
                    <span className="text-primary">Admin Account</span>
                  ) : (
                    "My Account"
                  )}
                </DropdownMenuLabel>
                <DropdownMenuItem className="gap-x-2 focus:bg-popover">
                  <Avatar className="h-11 w-11">
                    <AvatarImage src="#" />
                    <AvatarFallback>
                      <User className="w-5 h-5 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex gap-x-2 items-center">
                      <div className="font-semibold">{profile?.name}</div>
                    </div>
                    <div className="text-xs text-muted-foreground font-light">
                      {profile.email}
                    </div>
                  </div>
                </DropdownMenuItem>
                {profile.role.name === "admin" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push("/admin/dashboard")}
                      className="justify-between">
                      Dashboard
                      <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onLogout}
                  className="justify-between">
                  Logout <LogOut className="w-4 h-4 text-muted-foreground" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
