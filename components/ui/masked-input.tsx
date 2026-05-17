"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: (value: string) => string;
  error?: string;
  label?: string;
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, error, label, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = mask(e.target.value);
      e.target.value = masked;
      onChange?.(e);
    };

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-slate-900">
            {label}
          </label>
        )}
        <input
          ref={ref}
          onChange={handleChange}
          className={cn(
            "flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-950 shadow-sm transition-all placeholder:text-slate-400",
            "focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:shadow-md",
            "disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400",
            error && "border-red-300 focus:border-red-400 focus:ring-red-400/50",
            className,
          )}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  },
);

MaskedInput.displayName = "MaskedInput";
