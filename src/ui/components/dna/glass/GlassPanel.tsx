"use client";

import React from "react";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type GlassPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  sheen?: boolean;
};

export default function GlassPanel({ className, sheen = true, ...rest }: GlassPanelProps) {
  return (
    <div
      {...rest}
      className={clsx("glass rounded-2xl p-6 md:p-8", sheen && "sheen", className)}
    />
  );
}
