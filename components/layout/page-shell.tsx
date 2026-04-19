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
    <div className={cn("mx-auto min-h-screen w-full max-w-md bg-[#6c757d] px-3 pb-28 pt-3", className)}>
      <div className="min-h-[calc(100vh-7.5rem)] rounded-[36px] bg-white px-3 pb-6 pt-3 shadow-[-1px_-10px_30px_rgba(0,0,0,0.22)]">
        {children}
      </div>
      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}