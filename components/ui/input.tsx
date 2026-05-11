import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-14 w-full rounded-[999px] border-[2px] border-[#d6d9dd] bg-white px-5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#6E0D15] focus:ring-4 focus:ring-[#6E0D15]/15",
        className,
      )}
      {...props}
    />
  );
}