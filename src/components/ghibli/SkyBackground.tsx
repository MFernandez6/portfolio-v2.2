"use client";

import { motion } from "framer-motion";

/** Painterly cumulus — soft Ghibli cloud clusters */
function Cloud({
  top,
  left,
  scale = 1,
  opacity = 0.92,
  duration = 60,
}: {
  top: string;
  left: string;
  scale?: number;
  opacity?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left, scale, opacity }}
      animate={{ x: ["0%", "8%", "0%"] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative w-48 h-16">
        <div className="absolute w-20 h-20 -top-6 left-4 rounded-full bg-white/95 blur-[1px]" />
        <div className="absolute w-28 h-24 -top-4 left-12 rounded-full bg-white/90 blur-[1px]" />
        <div className="absolute w-24 h-20 -top-2 left-28 rounded-full bg-white/88 blur-[1px]" />
        <div className="absolute w-32 h-14 top-4 left-8 rounded-full bg-white/85 blur-[2px]" />
      </div>
    </motion.div>
  );
}

export default function SkyBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden -z-10"
      aria-hidden
    >
      {/* Summer sky — deep cyan melting to golden horizon */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #6BB5E0 0%,
              #8ECAE8 18%,
              #B8DDF0 38%,
              #E8F4FA 58%,
              #F5EDD8 78%,
              #E8F0E0 92%,
              #C5DEB8 100%
            )
          `,
        }}
      />

      {/* Sun glow */}
      <motion.div
        className="absolute top-[12%] right-[18%] w-24 h-24 sm:w-32 sm:h-32 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,248,220,0.95) 0%, rgba(255,230,180,0.4) 40%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Distant mountains — lavender silhouettes */}
      <svg
        className="absolute bottom-[18vh] left-0 w-full h-[28vh] opacity-40"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 L120 120 L280 180 L420 80 L580 160 L720 60 L900 150 L1080 90 L1280 170 L1440 130 L1440 280 L0 280 Z"
          fill="#9BA8C4"
        />
        <path
          d="M0 220 L200 150 L400 200 L600 110 L800 190 L1000 130 L1200 200 L1440 160 L1440 280 L0 280 Z"
          fill="#8B9BB5"
          fillOpacity="0.7"
        />
      </svg>

      <Cloud top="10%" left="-5%" scale={1.1} duration={55} />
      <Cloud top="22%" left="55%" scale={0.9} duration={70} opacity={0.85} />
      <Cloud top="8%" left="75%" scale={0.7} duration={48} opacity={0.75} />
      <Cloud top="35%" left="20%" scale={0.65} duration={62} opacity={0.6} />

      {/* Rolling hills — foreground meadows */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[42vh] min-h-[220px]"
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
      >
        <path
          d="M0 200 C200 160 350 240 550 180 C750 120 900 220 1100 160 C1250 120 1350 180 1440 150 L1440 360 L0 360 Z"
          fill="#A8C9A0"
          fillOpacity="0.55"
        />
        <path
          d="M0 250 C280 210 450 290 700 230 C950 170 1150 270 1440 220 L1440 360 L0 360 Z"
          fill="#7CB87C"
          fillOpacity="0.65"
        />
        <path
          d="M0 290 C180 270 400 320 720 285 C1040 250 1250 310 1440 280 L1440 360 L0 360 Z"
          fill="#5A9A6A"
          fillOpacity="0.8"
        />
        {/* Grass line highlight */}
        <path
          d="M0 300 C360 285 720 310 1080 295 1440 305 L1440 360 L0 360 Z"
          fill="#4A8A5A"
          fillOpacity="0.5"
        />
      </svg>

      {/* Light mist at horizon */}
      <div className="absolute bottom-[35vh] left-0 right-0 h-24 bg-gradient-to-t from-white/30 to-transparent" />

      {/* Drifting light motes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${(i * 19 + 5) % 100}%`,
            top: `${(i * 13 + 20) % 70}%`,
            width: 2 + (i % 3),
            height: 2 + (i % 3),
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
