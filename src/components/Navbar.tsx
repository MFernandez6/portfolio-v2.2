"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Mail,
  Download,
  Menu,
  X,
  Home,
  Briefcase,
  Newspaper,
} from "lucide-react";
import { profile } from "@/data/profile";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/news", label: "News", icon: Newspaper },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-paper-50/92 backdrop-blur-md shadow-paper border-b border-paper-300/60"
          : "bg-gradient-to-b from-sky-100/50 via-paper-50/30 to-transparent border-b border-white/20"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-meadow-400 to-forest-700 flex items-center justify-center shadow-md ring-2 ring-white/50 group-hover:shadow-soft transition-shadow">
              <span className="text-base font-display font-bold text-paper-50">
                M
              </span>
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="font-display text-lg text-forest-900 leading-tight">
                Miguel Fernandez
              </p>
              <p className="text-xs text-forest-700/75">Claims Adjuster</p>
            </div>
          </Link>

          <nav
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-0.5"
            aria-label="Main"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-forest-800/90 hover:text-forest-900 hover:bg-paper-50/50 transition-all"
                >
                  <Icon size={16} className="shrink-0 opacity-70" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <div className="hidden md:flex items-center gap-2">
              <a
                href="/insurance-resume.pdf"
                download
                className="ghibli-btn-soft inline-flex items-center gap-1.5 h-9 px-4 text-sm"
              >
                <Download size={14} />
                Resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="ghibli-btn-primary inline-flex items-center gap-1.5 h-9 px-4 text-sm"
              >
                <Mail size={14} />
                Contact
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full ghibli-btn-soft"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-white/40">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-forest-800 hover:bg-paper-50/50"
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
            <div className="flex gap-2 pt-2">
              <a
                href="/insurance-resume.pdf"
                download
                className="ghibli-btn-soft flex-1 inline-flex justify-center items-center h-10 text-sm"
              >
                Resume
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="ghibli-btn-primary flex-1 inline-flex justify-center items-center h-10 text-sm"
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
