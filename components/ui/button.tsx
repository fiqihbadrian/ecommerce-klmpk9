import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  asChild?: boolean;
  children?: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-[0_14px_28px_rgba(52,58,64,0.35)] hover:translate-y-[-1px] hover:bg-[#3f454b]",
  secondary: "bg-secondary text-[#495057] hover:bg-[#e9ecef]",
  ghost: "bg-transparent text-[#495057] hover:bg-black/5",
  danger: "bg-[#ef4444] text-white hover:bg-[#dc2626]",
};

export function Button({ className, variant = "primary", asChild = false, children, ...props }: ButtonProps) {
  const buttonClassName = cn(
    "inline-flex items-center justify-center gap-2 rounded-[999px] px-4 py-3 text-sm font-semibold transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
    variantStyles[variant],
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;

    return cloneElement(child, {
      className: cn(buttonClassName, child.props.className),
    });
  }

  return (
    <button
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
}