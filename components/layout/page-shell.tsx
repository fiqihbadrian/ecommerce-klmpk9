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
        "mx-auto min-h-screen w-full max-w-md bg-[#6c757d] px-4 pb-28",
        noTopPadding ? "pt-0" : "pt-4",
        className,
      )}
    >
      {children}
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}