import { ReactNode, HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export default function Heading({ children, className, ...props }: HeadingProps) {
  return (
    <h2 className={`text-3xl font-bold ${className ?? ""}`} {...props}>
      {children}
    </h2>
  );
}
