import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  tone?: "primary" | "accent" | "neutral" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "soft" | "outline";
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  tone = "neutral", 
  size = "md",
  variant = "solid",
  className, 
  ...props 
}) => {
  const baseStyles = cn(
    "inline-flex items-center rounded-full font-semibold uppercase tracking-wide",
    // Size variants
    {
      "px-2 py-0.5 text-[10px]": size === "sm",
      "px-3 py-1 text-[11px]": size === "md",
      "px-4 py-1.5 text-xs": size === "lg",
    },
    // Tone and variant combinations
    {
      // Primary
      "text-white bg-brand-primary": tone === "primary" && variant === "solid",
      "text-brand-primary bg-brand-primary/10 border border-brand-primary/20": tone === "primary" && variant === "soft",
      "text-brand-primary border border-brand-primary bg-transparent": tone === "primary" && variant === "outline",
      // Accent
      "text-brand-secondary bg-brand-accent": tone === "accent" && variant === "solid",
      "text-brand-accent bg-brand-accent/10 border border-brand-accent/20": tone === "accent" && variant === "soft",
      "text-brand-accent border border-brand-accent bg-transparent": tone === "accent" && variant === "outline",
      // Neutral
      "text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800": tone === "neutral" && variant === "solid",
      "text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700": tone === "neutral" && variant === "soft",
      "text-zinc-600 dark:text-zinc-400 border border-zinc-300 dark:border-zinc-600 bg-transparent": tone === "neutral" && variant === "outline",
      // Success
      "text-white bg-green-600": tone === "success" && variant === "solid",
      "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800": tone === "success" && variant === "soft",
      "text-green-600 dark:text-green-400 border border-green-300 dark:border-green-600 bg-transparent": tone === "success" && variant === "outline",
      // Warning
      "text-white bg-amber-600": tone === "warning" && variant === "solid",
      "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800": tone === "warning" && variant === "soft",
      "text-amber-600 dark:text-amber-400 border border-amber-300 dark:border-amber-600 bg-transparent": tone === "warning" && variant === "outline",
      // Error
      "text-white bg-red-600": tone === "error" && variant === "solid",
      "text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800": tone === "error" && variant === "soft",
      "text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 bg-transparent": tone === "error" && variant === "outline",
    },
    className
  );

  return (
    <span
      {...props}
      className={baseStyles}
    >
      {children}
    </span>
  );
};

export default Badge;
