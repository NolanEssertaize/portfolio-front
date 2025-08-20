"use client";

import React from "react";

export type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  sheen?: boolean;
};

export default function GlassPanel({ className = "", sheen = true, ...rest }: GlassPanelProps) {
  const classes = [
    "glass rounded-2xl p-6 md:p-8 drop-shadow-glass",
    sheen && "sheen",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...rest} />;
}
