"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WhisperQuoteProps {
  text: string;
  attribution: string;
  className?: string;
  align?: "left" | "right" | "center";
}

export default function WhisperQuote({
  text,
  attribution,
  className = "",
  align = "center",
}: WhisperQuoteProps) {
  const alignStyles = {
    left: "text-left mr-auto",
    right: "text-right ml-auto",
    center: "text-center mx-auto",
  };

  return (
    <motion.figure
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className={cn(
        "max-w-xs sm:max-w-md",
        alignStyles[align],
        className
      )}
    >
      <blockquote className="font-display text-sm sm:text-base italic text-forest-800/55 leading-relaxed">
        &ldquo;{text}&rdquo;
      </blockquote>

      <figcaption className="mt-1.5 text-[10px] sm:text-xs text-forest-700/48 tracking-widest uppercase">
        — {attribution}
      </figcaption>
    </motion.figure>
  );
}
