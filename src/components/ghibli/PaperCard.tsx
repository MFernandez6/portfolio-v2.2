"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PaperCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function PaperCard({
  children,
  className,
  delay = 0,
}: PaperCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn("ghibli-card", className)}
    >
      {children}
    </motion.div>
  );
}
