"use client";

import {
  Mail,
  Phone,
  MapPin,
  Download,
  Briefcase,
  Newspaper,
} from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-meadow-200/60 bg-gradient-to-b from-transparent via-paper-50/80 to-meadow-100/40 backdrop-blur-sm pb-16 sm:pb-[4.5rem]">
      <div className="max-w-6xl mx-auto px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-display text-2xl text-forest-900 mb-2">
              {profile.name}
            </h3>
            <p className="text-forest-700/85 text-sm leading-relaxed mb-4">
              {profile.tagline}
            </p>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-terracotta-500 hover:text-terracotta-400 transition-colors"
            >
              LinkedIn →
            </a>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Claims Adjusting", "Legal Tech", "Cybersecurity"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-paper-50/50 text-forest-700 text-xs border border-meadow-200/80"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-forest-900 mb-4">Contact</h4>
            <div className="space-y-3 text-sm">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-forest-700 hover:text-forest-900 transition-colors"
              >
                <Mail size={16} className="text-terracotta-400 shrink-0" />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-forest-700 hover:text-forest-900 transition-colors"
              >
                <Phone size={16} className="text-terracotta-400 shrink-0" />
                {profile.phone}
              </a>
              <p className="flex items-center gap-2 text-forest-700/80">
                <MapPin size={16} className="text-terracotta-400 shrink-0" />
                {profile.location}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg text-forest-900 mb-4">Explore</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/projects"
                className="flex items-center gap-2 text-forest-700 hover:text-forest-900 transition-colors"
              >
                <Briefcase size={16} className="text-meadow-500" />
                Projects
              </Link>
              <Link
                href="/news"
                className="flex items-center gap-2 text-forest-700 hover:text-forest-900 transition-colors"
              >
                <Newspaper size={16} className="text-meadow-500" />
                News
              </Link>
              <a
                href="/insurance-resume.pdf"
                download
                className="flex items-center gap-2 text-forest-700 hover:text-forest-900 transition-colors"
              >
                <Download size={16} className="text-meadow-500" />
                Insurance Resume
              </a>
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2 text-forest-700 hover:text-forest-900 transition-colors"
              >
                <Download size={16} className="text-meadow-500" />
                General Resume
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-meadow-200/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-forest-700/60">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs tracking-wide">✦ Built with care in Florida ✦</p>
        </div>
      </div>
    </footer>
  );
}
