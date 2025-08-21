"use client";
import KaizenHalo from "@/components/dna/background/KaizenHalo";
import Image from "next/image";

export default function HeroBackdrop(){
  return (
    <div className="absolute inset-0 -z-10 hero-vignette">
      <div className="absolute inset-0" style={{ backgroundImage: "var(--hero-bg)" }} />
      <div className="absolute inset-0 hero-dots opacity-[.06]" />

      {/* Center watermark + halo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <KaizenHalo size={720} thickness={3} glow opacity={0.12} className="hidden md:block" />
          <Image src="/kaizen-mark.svg" alt="" width={720} height={720} priority
                 className="w-[60vw] max-w-[720px] h-auto opacity-10" />
        </div>
      </div>
    </div>
  );
}
