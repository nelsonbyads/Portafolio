import React from "react";
import { cn } from "../../lib/utils";

export const Card: React.FC<{ children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div
    {...props}
    className={cn(
      "rounded-2xl border shadow-sm transition hover:shadow-md bg-white/90 dark:bg-zinc-900/80 backdrop-blur",
      "border-zinc-200 dark:border-zinc-800",
      className
    )}
  >
    {children}
  </div>
);

export default Card;

