import { HTMLAttributes } from "react";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Render element as a specific heading level.
   * Defaults to `h2`.
   */
  as?: HeadingLevel;
  /**
   * Optionally override default sizing styles.
   */
  size?: HeadingLevel;
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl md:text-5xl font-bold leading-tight tracking-tight",
  h2: "text-3xl md:text-4xl font-bold leading-tight tracking-tight",
  h3: "text-2xl md:text-3xl font-bold",
  h4: "text-xl md:text-2xl font-bold",
  h5: "text-lg md:text-xl font-bold",
  h6: "text-base md:text-lg font-bold",
};

export default function Heading({
  as = "h2",
  size,
  className = "",
  children,
  ...props
}: HeadingProps) {
  const Component = as;
  const classes = `${headingStyles[size ?? as]} ${className}`.trim();
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}

