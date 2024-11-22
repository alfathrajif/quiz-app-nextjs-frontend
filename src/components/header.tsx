"use client";
import { logout } from "@/actions/auth";
import { AuthContext } from "@/app/(auth)/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { commonRoutes, unauthenticatedRoutes } from "@/constants";
import {
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  User as UserIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import AdminSheet from "./admin-sheet";
import Brand from "./brand";
import { User } from "@/types/user";
import { Badge } from "./ui/badge";
import { GrUserAdmin } from "react-icons/gr";

const UserProfile = ({ profile }: { profile: User }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const onLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer h-9 w-9">
          <AvatarImage src="#" />
          <AvatarFallback>
            <UserIcon className="w-5 h-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuLabel>
          {profile.role.name === "admin" ? (
            <span className="text-foreground">Akun Admin</span>
          ) : (
            "Akun Saya"
          )}
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="gap-x-2 focus:bg-popover">
            <Avatar className="h-11 w-11">
              <AvatarImage src="#" />
              <AvatarFallback>
                <UserIcon className="w-5 h-5 text-muted-foreground" />
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
          <DropdownMenuItem className="justify-between focus:bg-popover">
            <span>Langganan</span>
            <span className="capitalize">
              {profile?.subscription?.subscription_plan.name === "premium" ? (
                <Badge>{profile.subscription.subscription_plan.name}</Badge>
              ) : (
                <Badge variant="outline">
                  {profile?.subscription?.subscription_plan.name}
                </Badge>
              )}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {profile.role.name === "admin" && (
            <DropdownMenuItem className="cursor-pointer">
              <Link
                href="/admin/dashboard"
                className="flex justify-between items-center w-full">
                <span>Administrator</span>
                <GrUserAdmin className="w-4 h-4 text-muted-foreground" />
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href="/u/dashboard"
              className="flex justify-between items-center w-full">
              <span>Dashboard</span>
              <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={toggleTheme}
            className="cursor-pointer justify-between">
            <span>
              <span className="hidden dark:block">Light Theme</span>
              <span className="block dark:hidden">Dark Theme</span>
            </span>
            <Button
              variant="ghost"
              className="hover:bg-transparent p-0.5 h-auto">
              <Sun className="w-4 h-4 text-muted-foreground rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute w-4 h-4 text-muted-foreground rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onLogout}
            className="cursor-pointer justify-between">
            Keluar <LogOut className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated, profile } = useContext(AuthContext);

  const isUnauthenticatedRoute = unauthenticatedRoutes.some((route) =>
    pathname.startsWith(route.path)
  );

  const isHomepage = pathname === "/";

  if (isUnauthenticatedRoute) return null;

  return (
    <header
      className={`sticky top-0 z-10 bg-background/90 backdrop-blur-md flex w-full items-center h-16 ${
        isHomepage &&
        "fixed top-0 left-0 bg-transparent backdrop-blur-none h-16"
      } `}>
      <div className="wrapper flex items-center">
        <div className="flex">
          {pathname.startsWith("/admin") && <AdminSheet />}
          <Brand href="/" />
        </div>

        <div className="ml-auto flex items-center gap-x-2">
          <div className="flex gap-x-1 mr-4">
            {commonRoutes.map((route, index) => (
              <Link
                key={index}
                href={route.path}
                className={`text-sm hover:text-foreground p-1 px-2 ${
                  pathname.startsWith(route.path)
                    ? "text-primary hover:text-primary"
                    : "text-muted-foreground"
                }`}>
                {route.title}
              </Link>
            ))}
          </div>
          {!isAuthenticated ? (
            <div className="flex gap-x-1.5">
              {unauthenticatedRoutes.map((route, index) => {
                const variant =
                  route.path === "/login" ? "secondary" : "default";

                return (
                  <Link key={index} href={route.path}>
                    <Button size="sm" variant={variant}>
                      {route.title}
                    </Button>
                  </Link>
                );
              })}
            </div>
          ) : (
            <UserProfile profile={profile} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
