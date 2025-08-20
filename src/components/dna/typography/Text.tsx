import { HTMLAttributes } from "react";

type TextSize = "sm" | "md" | "lg" | "muted";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: TextSize;
  /**
   * Optionally render a different HTML element.
   * Defaults to `p`.
   */
  as?: "p" | "span" | "div" | "a";
  href?: string;
}

const textStyles: Record<TextSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  muted: "text-sm text-gray-500 dark:text-gray-400",
};

export default function Text({
  size = "md",
  as: Component = "p",
  className = "",
  children,
  ...props
}: TextProps) {
  const classes = `${textStyles[size]} ${className}`.trim();
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

