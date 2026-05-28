"use client";

/** Minimal stick-figure brontosaurus — side view, facing right */
export default function StickBronto({ className = "" }: { className?: string }) {
  const stroke = "#2f4a38";
  const sw = 2.2;

  return (
    <svg
      viewBox="0 0 88 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Tail */}
      <path
        d="M8 34 L2 40 L0 46"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Body */}
      <line x1="10" y1="34" x2="48" y2="34" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />

      {/* Neck */}
      <line x1="48" y1="34" x2="58" y2="14" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />

      {/* Head */}
      <circle cx="62" cy="11" r="5" stroke={stroke} strokeWidth={sw} />
      <circle cx="64" cy="10" r="1" fill={stroke} />

      {/* Back legs */}
      <g className="bronto-leg-back">
        <line x1="22" y1="34" x2="20" y2="44" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="34" y1="34" x2="32" y2="44" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </g>

      {/* Front legs */}
      <g className="bronto-leg-front">
        <line x1="40" y1="34" x2="42" y2="44" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
        <line x1="46" y1="34" x2="48" y2="44" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      </g>
    </svg>
  );
}
