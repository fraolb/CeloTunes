"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cog, Compass, Home, Search, User2, Send } from "lucide-react";

import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const mobileNavItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Search", icon: Search, href: "/Search" },
  { label: "Send", icon: Send, href: "/browse" },
  { label: "Profile", icon: User2, href: "/Profile" },
  //   { label: "Settings", icon: Cog, href: "/settings" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-50 flex h-14 items-center justify-between border-t ${
        theme === "dark" ? "bg-black" : "bg-white"
      } lg:hidden`}
    >
      {mobileNavItems.slice().map(({ label, icon: Icon, href }) => {
        const isActive = href === pathname;

        return (
          <Link
            key={label}
            href={href}
            className={cn(
              "flex h-full w-1/4 flex-col items-center justify-center text-center text-muted-foreground duration-700 animate-in slide-in-from-bottom-full",
              isActive && "text-secondary-foreground"
            )}
          >
            <Icon />

            <span className="text-xs font-semibold duration-200 animate-in slide-in-from-bottom-1/2">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
