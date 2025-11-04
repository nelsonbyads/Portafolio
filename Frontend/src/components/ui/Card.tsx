import React from "react";
import { cn } from "../../lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "filled";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  variant = "default",
  padding = "md",
  interactive = false,
  ...props 
}) => {
  const baseStyles = cn(
    "rounded-2xl border transition-all duration-200",
    "bg-white/90 dark:bg-zinc-900/80 backdrop-blur",
    "border-zinc-200 dark:border-zinc-800",
    // Variants
    {
      "shadow-sm hover:shadow-md": variant === "default",
      "shadow-lg hover:shadow-xl": variant === "elevated", 
      "shadow-none border-2": variant === "outlined",
      "bg-zinc-50 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700": variant === "filled",
    },
    // Interactive states
    {
      "cursor-pointer hover:scale-[1.02] active:scale-[0.98]": interactive,
    },
    // Padding
    {
      "p-0": padding === "none",
      "p-3": padding === "sm",
      "p-5": padding === "md", 
      "p-6": padding === "lg",
    },
    className
  );

  return (
    <div
      {...props}
      className={baseStyles}
    >
      {children}
    </div>
  );
};

export default Card;

