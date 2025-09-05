import React from "react";
import { cn } from "../../lib/utils";

export const Badge: React.FC<{ children: React.ReactNode; tone?: "primary" | "accent" | "neutral" } & React.HTMLAttributes<HTMLSpanElement>> = ({ children, tone = "neutral", className, ...props }) => (
  <span
    {...props}
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide",
      tone === "primary" && "text-white bg-brand-primary",
      tone === "neutral" && "text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800",
      tone === "accent" && "text-brand-secondary bg-brand-accent",
      className
    )}
  >
    {children}
  </span>
);

export default Badge;
