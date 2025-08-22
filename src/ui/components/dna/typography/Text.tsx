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
  sm: "text-sm leading-relaxed",
  md: "text-base md:text-lg leading-relaxed",
  lg: "text-lg md:text-xl leading-relaxed",
  muted: "text-base md:text-lg leading-relaxed text-gray-500",
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

