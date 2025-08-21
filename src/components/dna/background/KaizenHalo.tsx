"use client";

function clsx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

 type Props = React.HTMLAttributes<HTMLDivElement> & {
  size?: number;        // px, default 760
  thickness?: number;   // px, default 2
  glow?: boolean;       // adds outer glow
  opacity?: number;     // 0..1, default 0.10
};

export default function KaizenHalo({ size=760, thickness=2, glow=true, opacity=0.10, className, ...rest }: Props){
  const style: React.CSSProperties = {
    width: size, height: size,
    '--halo-thickness': `${thickness}px`,
    '--halo-opacity': opacity.toString(),
  } as any;

  return (
    <div
      {...rest}
      aria-hidden
      className={clsx(
        "relative pointer-events-none select-none",
        "[@media(prefers-reduced-motion:no-preference)]:animate-[halo-rotate_9s_linear_infinite]",
        className
      )}
      style={style}
    >
      {/* LED ring using conic-gradient */}
      <div className="absolute inset-0 rounded-full"
        style={{
          mask: "radial-gradient(farthest-side, transparent calc(100% - var(--halo-thickness)), #000 calc(100% - var(--halo-thickness)))",
          WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - var(--halo-thickness)), #000 calc(100% - var(--halo-thickness)))",
          background: "conic-gradient(from 0deg, rgba(16,185,129,0) 0deg, rgba(16,185,129,.7) 30deg, rgba(16,185,129,0) 60deg, rgba(16,185,129,0) 360deg)",
          opacity: "var(--halo-opacity)"
        }}
      />
      {glow && (
        <div className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: "conic-gradient(from 0deg, rgba(16,185,129,0) 0deg, rgba(16,185,129,.35) 30deg, rgba(16,185,129,0) 60deg 360deg)",
            opacity: "calc(var(--halo-opacity) * .8)"
          }}
        />
      )}
    </div>
  );
}
