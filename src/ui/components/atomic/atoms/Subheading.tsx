import { ReactNode, HTMLAttributes } from "react";

interface SubheadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export default function Subheading({ children, className, ...props }: SubheadingProps) {
  return (
    <h3 className={`text-xl font-semibold ${className ?? ""}`} {...props}>
      {children}
    </h3>
  );
}
