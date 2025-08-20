import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  animation?: "none" | "roll-replace";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const variantClasses: Record<string, string> = {
  primary: "bg-[var(--primary)] text-[var(--primary-foreground)]",
  secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
  ghost: "bg-transparent text-[var(--foreground)]",
};

const sizeClasses: Record<string, string> = {
  sm: "px-2 py-1 text-sm rounded-md",
  md: "px-4 py-2 text-base rounded-lg",
  lg: "px-6 py-3 text-lg rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  animation = "roll-replace",
  leftIcon,
  rightIcon,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = [
    "btn group relative overflow-hidden inline-flex items-center justify-center font-medium focus:outline-none transition",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      data-anim={animation === "roll-replace" ? "roll-replace" : undefined}
      {...props}
    >
      {leftIcon && <span className="relative z-10 mr-2">{leftIcon}</span>}
      <span className="btn-text-front pointer-events-none relative z-10">{children}</span>
      <span aria-hidden className="btn-text-back pointer-events-none">{children}</span>
      {rightIcon && <span className="relative z-10 ml-2">{rightIcon}</span>}
    </button>
  );
}

