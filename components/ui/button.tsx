import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-black text-white hover:bg-black/90": variant === "default",
            "border border-black/10 bg-transparent hover:bg-black/5":
              variant === "outline",
            "hover:bg-black/5": variant === "ghost",
            "text-primary underline-offset-4 hover:underline":
              variant === "link",
          },
          {
            "h-11 px-8 py-2 text-base": size === "default",
            "h-9 rounded-md px-3 text-sm": size === "sm",
            "h-12 rounded-lg px-10 text-lg": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
