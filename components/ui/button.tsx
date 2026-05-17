"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const variants: Record<string, string> = {
  default:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-500 disabled:bg-slate-300 disabled:text-slate-500",
  secondary:
    "bg-slate-100 text-slate-950 hover:bg-slate-200 focus-visible:ring-slate-500 disabled:bg-slate-50 disabled:text-slate-400",
  outline:
    "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50 focus-visible:ring-slate-500 disabled:border-slate-200 disabled:text-slate-400",
  ghost: "bg-transparent text-slate-950 hover:bg-slate-100 focus-visible:ring-slate-500",
};

const sizes: Record<string, string> = {
  default: "h-12 px-5 text-sm",
  sm: "h-10 px-4 text-sm",
  lg: "h-14 px-6 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
