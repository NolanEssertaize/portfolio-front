"use client";
import Image from "next/image";

export default function KaizenAssembleBackdrop() {
  return (
    <div className="kaizen-bg">
      {/* Left half (masked) */}
      <div className="kaizen-half kaizen-left">
        <Image
          src="/kaizen-kanji-solid.svg"
          alt=""
          width={720}
          height={360}
          priority
          className="w-[min(72vw,720px)] h-auto select-none pointer-events-none"
        />
      </div>

      {/* Right half (masked) */}
      <div className="kaizen-half kaizen-right">
        <Image
          src="/kaizen-kanji-solid.svg"
          alt=""
          width={720}
          height={360}
          priority
          className="w-[min(72vw,720px)] h-auto select-none pointer-events-none"
        />
      </div>

      {/* Center flash */}
      <div className="kaizen-flash" />
    </div>
  );
}

