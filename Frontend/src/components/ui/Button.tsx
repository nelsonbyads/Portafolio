import React from "react";
import { cn } from "../../lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
  size?: "md" | "lg";
} & React.HTMLAttributes<HTMLAnchorElement>;

export const Button: React.FC<Props> = ({ children, href, onClick, className, variant = "solid", size = "md", ...props }) => {
  const base = cn(
    "inline-flex items-center justify-center rounded-2xl font-semibold transition focus:outline-none focus:ring-2 cursor-pointer",
    size === "md" ? "px-4 py-2 text-sm" : "px-6 py-3 text-base",
    variant === "solid"
      ? "text-white focus:ring-offset-2 bg-brand-primary"
      : "text-gray-900 dark:text-gray-100 border border-zinc-200 dark:border-zinc-800 bg-transparent",
    className
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} className={base} {...props} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <a onClick={onClick} className={base} {...props}>
      {children}
    </a>
  );
};

export default Button;
