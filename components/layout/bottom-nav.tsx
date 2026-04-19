"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const items = [
  { href: "/home", label: "Home", icon: HomeIcon },
  { href: "/search", label: "Search", icon: SearchIcon },
  { href: "/favorites", label: "Favorites", icon: HeartIcon },
  { href: "/profile", label: "Profile", icon: UserIcon },
];

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", active ? "stroke-current" : "stroke-current/70")} fill="none" strokeWidth="1.8">
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6.5 10.5V20h11V10.5" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", active ? "stroke-current" : "stroke-current/70")} fill="none" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function HeartIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", active ? "stroke-current" : "stroke-current/70")} fill="none" strokeWidth="1.8">
      <path d="M20 8.5c0 4.6-8 10.8-8 10.8S4 13.1 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z" />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", active ? "stroke-current" : "stroke-current/70")} fill="none" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19c1.7-3.2 4.1-4.8 6.5-4.8s4.8 1.6 6.5 4.8" />
    </svg>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 pb-[max(0.35rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-md px-4">
        <div className="relative rounded-[18px] bg-white px-3 pb-2 pt-2 shadow-[0_-6px_22px_rgba(0,0,0,0.22)]">
          <div className="flex items-end justify-between">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex w-[23%] flex-col items-center gap-1 rounded-[14px] px-1 pb-1 text-[11px] font-medium transition",
                active ? "text-[#343a40]" : "text-[#7a838d] hover:text-[#495057]",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full transition",
                  active
                    ? "-mt-6 bg-[#343a40] text-white shadow-[0_6px_14px_rgba(0,0,0,0.25)]"
                    : "bg-transparent",
                )}
              >
                <Icon active={active} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
          </div>
        </div>
      </div>
    </nav>
  );
}