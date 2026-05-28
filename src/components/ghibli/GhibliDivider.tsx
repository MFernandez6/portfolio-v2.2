export default function GhibliDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative h-10 sm:h-12 overflow-hidden opacity-70 ${className}`}
      aria-hidden
    >
      <svg
        className="absolute bottom-0 w-full h-full text-meadow-100/40"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0 24 C150 0 300 48 450 24 C600 0 750 48 900 24 C1050 0 1200 40 1200 48 L0 48 Z" />
      </svg>
    </div>
  );
}
