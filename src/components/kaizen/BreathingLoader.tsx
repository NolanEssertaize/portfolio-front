export default function BreathingLoader() {
  return (
    <div className="w-32 h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <g className="origin-center animate-[mountain-grow_0.6s_ease-out_forwards]">
          <path d="M10 90 L50 10 L90 90 Z" fill="black" />
        </g>
        <path id="runner-path" d="M20 90 L50 40 L80 90" fill="none" stroke="none" />
        <g fill="white" stroke="white" strokeWidth="2">
          <circle cx="0" cy="-3" r="3" fill="white" stroke="none" />
          <path
            d="M0 0 L0 6 M0 6 L-3 10 M0 6 L3 10 M0 2 L-3 4 M0 2 L3 0"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#runner-path" />
          </animateMotion>
        </g>
      </svg>
    </div>
  );
}
