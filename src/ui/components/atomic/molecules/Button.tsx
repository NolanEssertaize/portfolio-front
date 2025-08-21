import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`btn-glass px-4 py-2 rounded-lg ${className}`} {...props}>
      {children}
    </button>
  );
}
