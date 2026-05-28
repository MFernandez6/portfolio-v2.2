"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import StickBronto from "./StickBronto";

const BRONTO_W = 88;

export default function StickBrontoWalker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setMaxX(Math.max(0, trackRef.current.offsetWidth - BRONTO_W));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div
        ref={trackRef}
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <StickBronto className="h-10 w-auto opacity-70" />
      </div>
    );
  }

  return (
    <div
      ref={trackRef}
      className="absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute left-4 right-4 top-1/2 h-px bg-forest-800/10 opacity-60" />

      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2"
        animate={{
          x: [0, maxX, 0],
          scaleX: [1, 1, -1, -1, 1],
          y: [0, -3, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.48, 0.5, 0.98, 1],
        }}
      >
        <div className="bronto-walker">
          <StickBronto className="h-11 w-[88px] sm:h-12" />
        </div>
      </motion.div>
    </div>
  );
}
