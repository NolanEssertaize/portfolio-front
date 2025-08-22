import { HTMLAttributes, forwardRef } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => (
    <div
      ref={ref}
      className={`rounded-xl bg-white/60 backdrop-blur-md border border-white/20 shadow-md p-6 md:p-8 transition-transform duration-150 ${className}`}
      {...props}
    />
  )
);

Card.displayName = "Card";

export default Card;

