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
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/news", label: "News", icon: Newspaper },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "glass-card border-b border-white/20 shadow-2xl backdrop-blur-xl"
          : "bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 border-b border-yellow-400/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="group flex items-center gap-3 hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <span className="text-xl font-bold text-blue-900">M</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-yellow-400 drop-shadow-lg">
                Miguel Angel Fernandez
              </h1>
              <p className="text-xs text-blue-200 font-medium">
                Legal Professional & Software Engineer
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-3 rounded-xl hover:bg-blue-700/30 border border-transparent hover:border-blue-600/50 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                      <Icon size={16} className="text-blue-200" />
                    </div>
                    <span className="text-blue-200 font-medium group-hover:text-yellow-400 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              );
            })}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              asChild
              size="sm"
              className="group px-4 py-2 bg-blue-700/30 border border-blue-600/50 hover:bg-blue-600/40 hover:border-blue-500/60 transition-all duration-300 hover:scale-105"
            >
              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-2"
              >
                <div className="w-6 h-6 bg-blue-600/30 rounded flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                  <Download size={14} className="text-blue-200" />
                </div>
                <span className="text-blue-200 font-medium">Resume</span>
              </a>
            </Button>

            <Button
              asChild
              size="sm"
              className="group px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <a
                href="mailto:MiguelFernandez023@gmail.com"
                className="flex items-center gap-2"
              >
                <div className="w-6 h-6 bg-blue-900/20 rounded flex items-center justify-center group-hover:bg-blue-900/30 transition-colors">
                  <Mail size={14} className="text-blue-900" />
                </div>
                <span>Contact</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden group p-2 rounded-xl bg-blue-700/30 border border-blue-600/50 hover:bg-blue-600/40 transition-all duration-300"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {isMobileMenuOpen ? (
                <X
                  size={20}
                  className="text-blue-200 group-hover:text-yellow-400 transition-colors"
                />
              ) : (
                <Menu
                  size={20}
                  className="text-blue-200 group-hover:text-yellow-400 transition-colors"
                />
              )}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-card border-t border-white/20 mt-4 mb-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="p-4 space-y-3">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-blue-700/20 border border-blue-600/30 hover:bg-blue-600/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                      <Icon size={18} className="text-blue-200" />
                    </div>
                    <span className="text-blue-200 font-medium group-hover:text-yellow-400 transition-colors">
                      {item.label}
                    </span>
                  </Link>
                );
              })}

              <div className="pt-2 space-y-3">
                <Button
                  asChild
                  size="sm"
                  className="w-full group px-4 py-3 bg-blue-700/30 border border-blue-600/50 hover:bg-blue-600/40 transition-all duration-300"
                >
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center justify-center gap-2"
                  >
                    <div className="w-6 h-6 bg-blue-600/30 rounded flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                      <Download size={16} className="text-blue-200" />
                    </div>
                    <span className="text-blue-200 font-medium">
                      Download Resume
                    </span>
                  </a>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="w-full group px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 font-bold transition-all duration-300"
                >
                  <a
                    href="mailto:MiguelFernandez023@gmail.com"
                    className="flex items-center justify-center gap-2"
                  >
                    <div className="w-6 h-6 bg-blue-900/20 rounded flex items-center justify-center group-hover:bg-blue-900/30 transition-colors">
                      <Mail size={16} className="text-blue-900" />
                    </div>
                    <span>Contact Me</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
