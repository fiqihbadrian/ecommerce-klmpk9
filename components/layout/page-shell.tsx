import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { cn } from "@/lib/cn";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  showBottomNav?: boolean;
  noTopPadding?: boolean;
};

export function PageShell({ children, className, showBottomNav = true, noTopPadding = false }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto min-h-screen w-full max-w-md bg-[#6E0D15] px-4 pb-28",
        noTopPadding ? "pt-0" : "pt-4",
        className,
      )}
      style={{
        // Fix screen tearing on mobile
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {children}
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}