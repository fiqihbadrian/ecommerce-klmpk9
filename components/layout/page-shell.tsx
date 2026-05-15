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
        "mx-auto min-h-[100dvh] w-full max-w-md bg-[#6E0D15]",
        className,
      )}
    >
      <div
        className={cn(
          "px-4",
          showBottomNav && "pb-28",
          noTopPadding ? "pt-0" : "pt-4",
        )}
      >
        {children}
      </div>
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}