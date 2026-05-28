"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  subtitle?: string;
  subtitleClassName?: string;
}

export default function SectionHeading({
  children,
  subtitle,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 sm:mb-10"
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-meadow-500 text-lg" aria-hidden>
          ✦
        </span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] text-forest-900 tracking-tight">
          {children}
        </h2>
        <span className="text-meadow-500 text-lg hidden sm:inline" aria-hidden>
          ✦
        </span>
      </div>
      <div className="flex items-center gap-2 ml-1">
        <div className="h-px w-12 bg-gradient-to-r from-terracotta-400/80 to-transparent rounded-full" />
        <div className="h-1 w-1 rounded-full bg-gold-400/80" />
        <div className="h-px w-8 bg-gradient-to-r from-meadow-400/50 to-transparent rounded-full" />
      </div>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-forest-700/85 text-lg max-w-2xl leading-relaxed font-light",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
