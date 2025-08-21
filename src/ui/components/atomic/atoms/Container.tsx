import { ReactNode, HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={`container mx-auto px-4 ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
}
