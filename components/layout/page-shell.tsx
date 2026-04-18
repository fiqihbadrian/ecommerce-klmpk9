import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { cn } from "@/lib/cn";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  showBottomNav?: boolean;
};

export function PageShell({ children, className, showBottomNav = true }: PageShellProps) {
  return (
    <div className={cn("mx-auto flex min-h-screen w-full max-w-md flex-col px-4 pb-28 pt-4", className)}>
      {children}
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}