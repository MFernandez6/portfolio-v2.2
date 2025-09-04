"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone, Download, ExternalLink } from "lucide-react";

interface JeopardyItem {
  points: number;
  content: string;
  details: string;
  description: string;
}

interface JeopardyCategory {
  name: string;
  items: JeopardyItem[];
}

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<JeopardyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories: JeopardyCategory[] = [
    {
      name: "WORK EXPERIENCE",
      items: [
        {
          points: 1000,
          content: "Construction Defects Paralegal",
          details: "Cole Scott & Kissane, Miami, FL (2023-Present)",
          description:
            "Specialized in construction defect litigation, managing complex cases and coordinating with multiple parties.",
        },
        {
          points: 800,
          content: "Software Engineer Consultant",
          details: "FDM Group, Deutsche Bank (2022-2023)",
          description:
            "Developed financial applications and implemented automated testing solutions.",
        },
        {
          points: 600,
          content: "Corporate Paralegal",
          details: "Wood & Associate, Insurance Defense (2019-2022)",
          description:
            "Handled corporate legal matters and insurance defense cases.",
        },
        {
          points: 400,
          content: "Litigation Paralegal",
          details: "Pollack Pollack Isaac & DeCicco, NY (2017-2019)",
          description:
            "Supported litigation teams in personal injury and medical malpractice cases.",
        },
        {
          points: 200,
          content: "Paralegal",
          details: "Nunez Law, Miami, FL (2016-2017)",
          description:
            "Assisted with various legal matters and client communications.",
        },
      ],
    },
    {
      name: "EDUCATION",
      items: [
        {
          points: 1000,
          content: "Associate of Science",
          details: "Cybersecurity, Miami Dade College (2024-2025)",
          description:
            "Currently pursuing cybersecurity degree to enhance technical skills.",
        },
        {
          points: 800,
          content: "Certificate Program",
          details: "Full-Stack Web Development, UM (2019-2020)",
          description:
            "Completed comprehensive web development program covering modern technologies.",
        },
        {
          points: 600,
          content: "Master of Science",
          details: "Law and Policy, Nova Southeastern (2015-2017)",
          description:
            "Advanced degree focusing on legal theory and policy analysis.",
        },
        {
          points: 400,
          content: "Paralegal Studies",
          details: "University of Miami Certificate (2013)",
          description:
            "Professional certification in paralegal studies and legal procedures.",
        },
        {
          points: 200,
          content: "Political Science",
          details: "Bachelor's Degree, Florida State (2009-2011)",
          description: "Foundation in political theory and government systems.",
        },
      ],
    },
    {
      name: "PROJECTS",
      items: [
        {
          points: 1000,
          content: "Portfolio Website",
          details: "Professional Showcase with News Aggregation (2024)",
          description:
            "Modern portfolio website with integrated news aggregation and professional presentation.",
        },
        {
          points: 800,
          content: "ClaimSaver+",
          details: "Legal Tech Platform for Accident Recovery (2024)",
          description:
            "Innovative legal technology platform designed to streamline accident recovery processes.",
        },
        {
          points: 600,
          content: "Needle & Knead",
          details: "Massage Therapy Business Website (2024)",
          description:
            "Professional website for massage therapy business with booking and information systems.",
        },
      ],
    },
    {
      name: "SKILLS",
      items: [
        {
          points: 1000,
          content: "Legal Technology",
          details: "Everlaw, KLDiscovery, Thomson Reuters (Current)",
          description:
            "Proficient in modern legal technology platforms and e-discovery tools.",
        },
        {
          points: 800,
          content: "Frameworks & Tools",
          details: "React.js, Next.js, Spring Boot, Docker",
          description:
            "Expertise in modern web development frameworks and containerization.",
        },
        {
          points: 600,
          content: "Database & Cloud",
          details: "MySQL, PostgreSQL, AWS, Cloud Computing",
          description:
            "Experience with database management and cloud infrastructure.",
        },
        {
          points: 400,
          content: "Programming Languages",
          details: "JavaScript, Java, Python, TypeScript",
          description:
            "Proficient in multiple programming languages for diverse development needs.",
        },
        {
          points: 200,
          content: "Languages",
          details: "English (Fluent)",
          description:
            "Native English speaker with excellent communication skills.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background with animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-400/8 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Main Jeopardy Card */}
        <div className="glass-card rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Jeopardy Header */}
          <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 p-4 sm:p-8 text-center border-b-4 border-yellow-400">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-korinna text-yellow-400 tracking-wider mb-4 sm:mb-6 drop-shadow-lg animated-float">
              JEOPARDY!
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <Image
                src="/founder1.jpg"
                alt="Miguel Angel Fernandez"
                width={80}
                height={80}
                className="rounded-full border-4 border-yellow-400 object-cover shadow-xl sm:w-[100px] sm:h-[100px]"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-korinna text-yellow-400 drop-shadow">
                  Miguel Angel Fernandez
                </h2>
                <p className="text-lg sm:text-xl text-slate-300">
                  <span className="block sm:inline">Legal Professional </span>
                  <span className="block sm:inline">& Software Engineer</span>
                </p>
              </div>
            </div>
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-4">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2 sm:gap-3 bg-slate-700/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-yellow-400 text-yellow-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <MapPin
                      size={14}
                      className="text-yellow-400 sm:w-4 sm:h-4"
                    />
                  </div>
                  <span className="hidden sm:inline">
                    Miami-Dade County, FL
                  </span>
                  <span className="sm:hidden">Miami-Dade, FL</span>
                </span>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <a
                  href="mailto:MiguelFernandez023@gmail.com"
                  className="relative flex items-center gap-2 sm:gap-3 bg-slate-700/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-yellow-400 text-yellow-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Mail size={14} className="text-yellow-400 sm:w-4 sm:h-4" />
                  </div>
                  <span className="hidden lg:inline">
                    MiguelFernandez023@gmail.com
                  </span>
                  <span className="hidden sm:inline lg:hidden">
                    MiguelFernandez023@...
                  </span>
                  <span className="sm:hidden">Email</span>
                </a>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <a
                  href="tel:17864173869"
                  className="relative flex items-center gap-2 sm:gap-3 bg-slate-700/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-yellow-400 text-yellow-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Phone
                      size={14}
                      className="text-yellow-400 sm:w-4 sm:h-4"
                    />
                  </div>
                  <span className="hidden sm:inline">(786) 417-3869</span>
                  <span className="sm:hidden">Call</span>
                </a>
              </div>
            </div>
          </div>

          {/* Jeopardy Board */}
          <div className="p-4 sm:p-8 bg-gradient-to-br from-slate-800 to-slate-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-3 sm:space-y-4">
                  {/* Category Header */}
                  <Card className="bg-gradient-to-r from-blue-700 to-blue-800 text-center text-base sm:text-lg shadow-glow border-2 border-yellow-400">
                    <CardHeader className="pb-2 sm:pb-3 px-3 sm:px-6">
                      <CardTitle className="text-yellow-400 font-bold text-sm sm:text-base">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  {/* Point Value Cards */}
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="animated-fadein"
                      style={{ animationDelay: `${itemIndex * 0.1}s` }}
                    >
                      <Card
                        className="bg-gradient-to-br from-slate-700 to-slate-800 cursor-pointer group shadow-lg border-2 border-blue-600 hover:border-yellow-400 transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsModalOpen(true);
                        }}
                      >
                        <CardContent className="p-3 sm:p-4 text-center">
                          <div className="text-yellow-400 text-xl sm:text-2xl font-bold mb-1 sm:mb-2 drop-shadow">
                            ${item.points}
                          </div>
                          <div className="text-slate-200 text-xs sm:text-sm font-semibold mb-1 group-hover:text-yellow-300 transition-colors">
                            {item.content}
                          </div>
                          <div className="text-slate-400 text-xs opacity-90 mb-1">
                            {item.details.includes("(")
                              ? item.details.split("(")[0].trim()
                              : item.details}
                          </div>
                          <div className="text-slate-500 text-xs opacity-75 mb-2">
                            {item.details.includes("(")
                              ? item.details
                                  .match(/\([^)]+\)/)?.[0]
                                  ?.replace(/[()]/g, "")
                              : ""}
                          </div>
                          <div className="text-yellow-400 text-xs font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                            Click to learn more
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 p-4 sm:p-8 border-t-4 border-yellow-400">
            {/* Download Resume Section */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 shadow-glow transition-all duration-300"
                >
                  <a href="/resume.pdf" download>
                    <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    General Resume
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 shadow-glow transition-all duration-300"
                >
                  <a href="/insurance-resume.pdf" download>
                    <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Insurance Resume
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-700 to-blue-800 hover:from-yellow-500 hover:to-yellow-600 h-12 sm:h-16 text-base sm:text-lg font-bold border-2 border-yellow-400 glassy-card transition-all duration-300"
              >
                <a href="/projects">
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">View My Work</span>
                  <span className="sm:hidden">Projects</span>
                </a>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-700 to-purple-800 hover:from-yellow-500 hover:to-yellow-600 h-12 sm:h-16 text-base sm:text-lg font-bold border-2 border-yellow-400 glassy-card transition-all duration-300"
              >
                <a href="/news">
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">Industry News</span>
                  <span className="sm:hidden">News</span>
                </a>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-red-700 to-red-800 hover:from-yellow-500 hover:to-yellow-600 h-12 sm:h-16 text-base sm:text-lg font-bold border-2 border-yellow-400 glassy-card transition-all duration-300 sm:col-span-2 lg:col-span-1"
              >
                <a href="mailto:MiguelFernandez023@gmail.com">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">Contact Me</span>
                  <span className="sm:hidden">Contact</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for detailed information */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-yellow-400 p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
                ${selectedItem.points}
              </h3>
              <h4 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-2">
                {selectedItem.content}
              </h4>
              <p className="text-slate-400 text-sm sm:text-base mb-4">
                {selectedItem.details}
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {selectedItem.description}
              </p>
            </div>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
