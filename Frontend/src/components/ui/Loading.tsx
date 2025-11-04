import React from "react";
import { cn } from "../../lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse" | "skeleton";
  className?: string;
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = "md", 
  variant = "spinner", 
  className,
  text 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  if (variant === "skeleton") {
    return (
      <div className={cn("loading-skeleton rounded", sizeClasses[size], className)} />
    );
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <div className={cn("w-2 h-2 bg-brand-primary rounded-full animate-bounce", size === "sm" && "w-1 h-1", size === "lg" && "w-3 h-3")} style={{ animationDelay: "0ms" }} />
        <div className={cn("w-2 h-2 bg-brand-primary rounded-full animate-bounce", size === "sm" && "w-1 h-1", size === "lg" && "w-3 h-3")} style={{ animationDelay: "150ms" }} />
        <div className={cn("w-2 h-2 bg-brand-primary rounded-full animate-bounce", size === "sm" && "w-1 h-1", size === "lg" && "w-3 h-3")} style={{ animationDelay: "300ms" }} />
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className={cn("w-3 h-3 bg-brand-primary rounded-full animate-pulse", size === "sm" && "w-2 h-2", size === "lg" && "w-4 h-4")} />
        {text && (
          <span className={cn("text-zinc-600 dark:text-zinc-400", textSizeClasses[size])}>
            {text}
          </span>
        )}
      </div>
    );
  }

  // Default spinner
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <svg 
        className={cn("animate-spin text-brand-primary", sizeClasses[size])} 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <span className={cn("text-zinc-600 dark:text-zinc-400", textSizeClasses[size])}>
          {text}
        </span>
      )}
    </div>
  );
};

export default Loading;

