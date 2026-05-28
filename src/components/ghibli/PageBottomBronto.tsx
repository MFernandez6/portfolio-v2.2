"use client";

import StickBrontoWalker from "./StickBrontoWalker";

/** Fixed to viewport bottom — always visible while scrolling, aligned with footer */
export default function PageBottomBronto() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 h-14 sm:h-16 pointer-events-none bg-transparent"
      aria-hidden
    >
      <div className="relative max-w-6xl mx-auto h-full px-4 sm:px-6">
        <StickBrontoWalker />
      </div>
    </div>
  );
}
