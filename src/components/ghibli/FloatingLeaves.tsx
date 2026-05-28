"use client";

import { motion } from "framer-motion";

const leaves = [
  { left: "8%", delay: 0, duration: 14, size: 14, rotate: 15 },
  { left: "22%", delay: 2, duration: 18, size: 10, rotate: -20 },
  { left: "45%", delay: 4, duration: 16, size: 12, rotate: 30 },
  { left: "68%", delay: 1, duration: 20, size: 11, rotate: -10 },
  { left: "85%", delay: 3, duration: 15, size: 13, rotate: 25 },
  { left: "55%", delay: 6, duration: 17, size: 9, rotate: -35 },
];

function LeafIcon({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 24 34"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 2 C4 10 4 22 12 32 C20 22 20 10 12 2 Z"
        fill={color}
        fillOpacity="0.85"
      />
      <path
        d="M12 6 L12 28"
        stroke="#3d5a45"
        strokeWidth="0.8"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

export default function FloatingLeaves() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden -z-[5]"
      aria-hidden
    >
      {leaves.map((leaf, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: leaf.left, top: "-5%" }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, 30, -20, 10, 0],
            rotate: [leaf.rotate, leaf.rotate + 45, leaf.rotate + 90],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "linear",
          }}
        >
          <LeafIcon
            size={leaf.size}
            color={i % 2 === 0 ? "#6B9B7A" : "#8FB996"}
          />
        </motion.div>
      ))}
    </div>
  );
}
