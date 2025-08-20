"use client";
import Image from "next/image";

export default function HeroBackdrop(){
  return (
    <div className="absolute inset-0 -z-10 hero-vignette">
      {/* color field */}
      <div className="absolute inset-0" style={{ backgroundImage: "var(--hero-bg)" }} />
      {/* faint dot grid */}
      <div className="absolute inset-0 hero-dots opacity-[.06]" />

      {/* KAIZEN watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="opacity-10">
          <Image
            src="/kaizen-mark.svg"
            alt="" width={720} height={720} priority
            className="w-[60vw] max-w-[720px] h-auto"
          />
        </div>
      </div>
    </div>
  );
}
