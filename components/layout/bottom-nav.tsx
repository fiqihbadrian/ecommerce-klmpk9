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
    <nav className="fixed inset-x-0 bottom-0 z-40 px-0 pb-[max(0.4rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-md rounded-t-[26px] bg-white px-2 pb-2 pt-1 shadow-[0_-8px_28px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-between gap-1">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 rounded-[20px] px-2 py-2 text-[11px] font-semibold transition",
                active
                  ? "bg-[#343a40] text-white shadow-[0_8px_18px_rgba(52,58,64,0.35)]"
                  : "text-[#6c757d] hover:bg-slate-100",
              )}
            >
              <Icon active={active} />
              <span>{item.label}</span>
            </Link>
          );
        })}
        </div>
      </div>
    </nav>
  );
}