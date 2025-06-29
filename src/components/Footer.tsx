"use client";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Globe,
  Newspaper,
  Briefcase,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/95 to-blue-900/90"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400/10 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400/5 rounded-full blur-md animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          {/* Top Section with Glassmorphism Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl sm:text-2xl font-bold text-blue-900">
                      M
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 drop-shadow-lg">
                      Miguel Angel Fernandez
                    </h3>
                    <p className="text-blue-200 font-medium text-sm sm:text-base">
                      Legal Professional & Software Engineer
                    </p>
                  </div>
                </div>

                <p className="text-blue-100 leading-relaxed mb-6 text-sm sm:text-base">
                  Bridging the gap between legal expertise and innovative
                  technology. Specializing in legal tech solutions and modern
                  web development.
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-3">
                  <div className="px-1 sm:px-3 lg:px-4 py-1 sm:py-2 bg-blue-700/30 rounded-full border border-blue-600/50 text-blue-200 text-xs sm:text-sm font-medium">
                    Legal Tech
                  </div>
                  <div className="px-1 sm:px-3 lg:px-4 py-1 sm:py-2 bg-blue-700/30 rounded-full border border-blue-600/50 text-blue-200 text-xs sm:text-sm font-medium">
                    Web Development
                  </div>
                  <div className="px-1 sm:px-3 lg:px-4 py-1 sm:py-2 bg-blue-700/30 rounded-full border border-blue-600/50 text-blue-200 text-xs sm:text-sm font-medium">
                    AI Integration
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
              <h4 className="text-lg sm:text-xl font-bold text-yellow-400 mb-4 sm:mb-6 flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Phone size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
                </div>
                Contact
              </h4>

              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:MiguelFernandez023@gmail.com"
                  className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-blue-700/20 border border-blue-600/30 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                    <Mail size={14} className="text-blue-200 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-blue-200 font-medium text-xs sm:text-sm">
                      Email
                    </p>
                    <p className="text-blue-300 text-xs">
                      MiguelFernandez023@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:17864173869"
                  className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-blue-700/20 border border-blue-600/30 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                    <Phone size={14} className="text-blue-200 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-blue-200 font-medium text-xs sm:text-sm">
                      Phone
                    </p>
                    <p className="text-blue-300 text-xs">(786) 417-3869</p>
                  </div>
                </a>

                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-blue-700/20 border border-blue-600/30">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600/30 rounded-lg flex items-center justify-center">
                    <MapPin size={14} className="text-blue-200 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <p className="text-blue-200 font-medium text-xs sm:text-sm">
                      Location
                    </p>
                    <p className="text-blue-300 text-xs">
                      Miami-Dade County, FL
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="glass-card p-4 sm:p-6 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
              <h4 className="text-lg sm:text-xl font-bold text-yellow-400 mb-4 sm:mb-6 flex items-center gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                  <Globe size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
                </div>
                Navigation
              </h4>

              <div className="space-y-2 sm:space-y-3">
                <Link
                  href="/"
                  className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-blue-700/20 border border-blue-600/30 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                    <span className="text-blue-200 text-xs sm:text-sm font-bold">
                      H
                    </span>
                  </div>
                  <span className="text-blue-200 font-medium text-xs sm:text-sm">
                    Home
                  </span>
                </Link>

                <Link
                  href="/projects"
                  className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-blue-700/20 border border-blue-600/30 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                    <Briefcase
                      size={14}
                      className="text-blue-200 sm:w-4 sm:h-4"
                    />
                  </div>
                  <span className="text-blue-200 font-medium text-xs sm:text-sm">
                    Projects
                  </span>
                </Link>

                <Link
                  href="/news"
                  className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-blue-700/20 border border-blue-600/30 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                    <Newspaper
                      size={14}
                      className="text-blue-200 sm:w-4 sm:h-4"
                    />
                  </div>
                  <span className="text-blue-200 font-medium text-xs sm:text-sm">
                    News
                  </span>
                </Link>

                <a
                  href="/resume.pdf"
                  download
                  className="group flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-blue-700/20 border border-blue-600/30 hover:bg-blue-600/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                    <Download
                      size={14}
                      className="text-blue-200 sm:w-4 sm:h-4"
                    />
                  </div>
                  <span className="text-blue-200 font-medium text-xs sm:text-sm">
                    Resume
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
              <div className="text-center lg:text-left">
                <p className="text-blue-200 font-medium text-sm sm:text-base">
                  © 2024 Miguel Angel Fernandez. All rights reserved.
                </p>
                <p className="text-blue-300 text-xs sm:text-sm mt-1">
                  Crafted with passion and precision
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-blue-700/30 rounded-full border border-blue-600/50">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-200 text-xs sm:text-sm font-medium">
                    Available for Projects
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-blue-300 text-xs sm:text-sm font-medium">
                    Built with
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 mt-1">
                    <span className="px-2 py-1 bg-blue-600/30 rounded text-blue-200 text-xs">
                      Next.js
                    </span>
                    <span className="px-2 py-1 bg-blue-600/30 rounded text-blue-200 text-xs">
                      TypeScript
                    </span>
                    <span className="px-2 py-1 bg-blue-600/30 rounded text-blue-200 text-xs">
                      Tailwind
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
