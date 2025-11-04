import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  href, 
  onClick, 
  className, 
  variant = "solid", 
  size = "md", 
  disabled = false,
  loading = false,
  type = "button",
  target,
  rel,
  ...props 
}) => {
  const baseStyles = cn(
    "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary/50",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
    "active:scale-95",
    // Size variants
    {
      "px-3 py-1.5 text-xs": size === "sm",
      "px-4 py-2 text-sm": size === "md", 
      "px-6 py-3 text-base": size === "lg",
    },
    // Color variants
    {
      "text-white bg-brand-primary hover:bg-brand-primary/90 focus:ring-brand-primary/50": variant === "solid",
      "text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800": variant === "ghost",
      "text-brand-primary border-2 border-brand-primary bg-transparent hover:bg-brand-primary hover:text-white": variant === "outline",
    },
    className
  );

  const content = (
    <>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        onClick={onClick} 
        className={baseStyles} 
        target={target || "_blank"} 
        rel={rel || "noreferrer"}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick} 
      className={baseStyles}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
