"use client";
import { Mail, Phone, MapPin, Download, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";

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
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  useEffect(() => {
    // Show welcome modal on page load
    setShowWelcomeModal(true);
  }, []);

  const categories: JeopardyCategory[] = [
    {
      name: "WORK EXPERIENCE",
      items: [
        {
          points: 1000,
          content: "Construction Defects Paralegal",
          details: "Cole Scott & Kissane, Miami, FL (2023-Present)",
          description:
            "Implement and maintain legal tech solutions including Everlaw, KLDiscovery's Nebula, and Thomson Reuters CoCounsel to streamline workflows and enhance efficiency. Leverage AI software to analyze extensive document productions using targeted prompts for rapid insights. Support associates and partners in trial prep, depositions, and legal strategy development. Manage complex construction defect litigation cases and coordinate with multiple stakeholders.",
        },
        {
          points: 800,
          content: "Software Engineer Consultant",
          details: "FDM Group, Deutsche Bank (2022-2023)",
          description:
            "Created and implemented UI/UX designs using React.js, Node, and Java. Managed SDLC of software components through to production. Experienced in CI/CD tools (Jenkins) and DevOps for UAT environments. Worked in Agile/Scrum teams and participated in code reviews. Selected by Deutsche Bank to support mobile corporate banking development team.",
        },
        {
          points: 600,
          content: "Corporate Paralegal",
          details: "Wood & Associate, Insurance Defense (2019-2022)",
          description:
            "First-party insurance defense firm specializing in property damage, business interruption, and insurance coverage disputes. Prepared proposals for settlements, propounded named insured and assignment of benefits (AOB) discovery. Drafted motions, pleadings, and legal memoranda for complex insurance litigation matters. Conducted legal research on insurance law, coverage issues, and regulatory compliance requirements.",
        },
        {
          points: 400,
          content: "Litigation Paralegal",
          details: "Pollack Pollack Isaac & DeCicco, NY (2017-2019)",
          description:
            "Premier New York personal injury law firm specializing in catastrophic injuries, medical malpractice, and complex litigation. Communicated with opposing counsel, judicial assistants, and court reporters across multiple jurisdictions. Prepared summons, complaints, and legal demands for high-value personal injury and medical negligence cases. Assisted in case management, document review, and trial preparation for complex litigation matters.",
        },
        {
          points: 200,
          content: "Paralegal",
          details: "Nunez Law, Miami, FL (2016-2017)",
          description:
            "Plaintiff's personal injury law firm specializing in auto accidents, slip and falls, and medical negligence cases. Managed case files, prepared legal documents, and coordinated with clients and medical providers. Assisted in discovery processes, document review, and trial preparation for complex personal injury litigation. Conducted client intake interviews and maintained detailed case documentation and medical records.",
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
            "Second associate degree in Cybersecurity. Coursework includes Network Security, Digital Forensics, Ethical Hacking, Cybersecurity Fundamentals, and Incident Response. Currently pursuing CompTIA Security+ Certification (anticipated completion July 2025).",
        },
        {
          points: 800,
          content: "Certificate Program",
          details: "Full-Stack Web Development, UM (2019-2020)",
          description:
            "Comprehensive program covering HTML, CSS, JavaScript, Node.js, SQL, Java, Docker, Git, and Spring Boot. Hands-on experience with modern web development technologies and best practices.",
        },
        {
          points: 600,
          content: "Master of Science",
          details: "Law and Policy, Nova Southeastern (2015-2017)",
          description:
            "Magna Cum Laude; 3.78 GPA. Focused on Administrative Law, Immigration Law, and Federal Privacy Law. Completed comprehensive legal research and policy analysis coursework.",
        },
        {
          points: 400,
          content: "Paralegal Studies",
          details: "University of Miami Certificate (2013)",
          description:
            "Certificate program covering legal research, document preparation, civil procedure, and paralegal ethics. Provided foundation for legal career and professional development.",
        },
        {
          points: 200,
          content: "Political Science",
          details: "Bachelor's Degree, Florida State (2009-2011)",
          description:
            "Bachelor of Science in Political Science. Coursework included American government, international relations, political theory, and research methods. Developed strong analytical and research skills.",
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
            "Modern portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include Jeopardy-style home page, news aggregation from multiple sources, project showcase, and responsive design. Demonstrates full-stack development skills and modern web technologies.",
        },
        {
          points: 800,
          content: "ClaimSaver+",
          details: "Legal Tech Platform for Accident Recovery (2024)",
          description:
            "Comprehensive accident recovery platform that streamlines the process of filing accident claims and connecting users with qualified attorneys. Features include real-time form validation, secure document management, attorney matching services for Florida and New York, and flat-fee pricing model.",
        },
        {
          points: 600,
          content: "Needle & Knead",
          details: "Massage Therapy Business Website (2024)",
          description:
            "Professional massage therapy business website offering at-home massage services in Miami, Florida. Features service showcase, booking system, multiple massage therapy services (Swedish, Deep Tissue, Sports Massage, TMJ, Reflexology), and mobile-responsive design.",
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
            "Expert-level proficiency in legal technology platforms including Everlaw for e-discovery, KLDiscovery's Nebula for document management, and Thomson Reuters CoCounsel for AI-powered legal research and document analysis. Experience implementing and optimizing these tools for complex litigation workflows.",
        },
        {
          points: 800,
          content: "Frameworks & Tools",
          details: "React.js, Next.js, Spring Boot, Docker",
          description:
            "Advanced proficiency in modern web development frameworks and tools. Experience with React.js for frontend development, Next.js for full-stack applications, Spring Boot for Java backend development, and Docker for containerization and deployment.",
        },
        {
          points: 600,
          content: "Database & Cloud",
          details: "MySQL, PostgreSQL, AWS, Cloud Computing",
          description:
            "Experience with relational databases (MySQL, PostgreSQL), cloud computing platforms (AWS), and cloud infrastructure management. Knowledge of database design, optimization, and cloud deployment strategies.",
        },
        {
          points: 400,
          content: "Programming Languages",
          details: "JavaScript, Java, Python, TypeScript",
          description:
            "Proficient in multiple programming languages including JavaScript for web development, Java for enterprise applications, Python for automation and data analysis, and TypeScript for type-safe JavaScript development.",
        },
        {
          points: 200,
          content: "Languages",
          details: "English (Fluent), Spanish (Fluent)",
          description:
            "Bilingual proficiency in English and Spanish. Ability to communicate effectively in both languages for legal and technical contexts, including client interactions, document preparation, and cross-cultural communication.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Background with animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-400/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Main Jeopardy Card */}
        <div className="glass-card rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Jeopardy Header */}
          <div className="bg-[#060ce9] p-4 sm:p-8 text-center border-b-4 border-yellow-400">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-korinna text-yellow-400 tracking-wider mb-4 sm:mb-6 drop-shadow-lg animated-float">
              JEOPARDY!
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <Image
                src="/profile.jpeg"
                alt="Miguel Angel Fernandez"
                width={80}
                height={80}
                className="rounded-full border-4 border-yellow-400 object-cover shadow-xl sm:w-[100px] sm:h-[100px]"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-korinna text-yellow-400 drop-shadow">
                  Miguel Angel Fernandez
                </h2>
                <p className="text-lg sm:text-xl text-[#cccccc]">
                  <span className="block sm:inline">Legal Professional</span>
                  <span className="block sm:inline">& Software Engineer</span>
                </p>
                <p className="text-base sm:text-lg text-[#bbbbbb]">
                  Miami-Dade County, Florida
                </p>
              </div>
            </div>
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-4">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2 sm:gap-3 bg-[#060ce9] px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-yellow-400 text-yellow-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
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
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <a
                  href="mailto:MiguelFernandez023@gmail.com"
                  className="relative flex items-center gap-2 sm:gap-3 bg-[#060ce9] px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-yellow-400 text-yellow-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
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
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <a
                  href="tel:17864173869"
                  className="relative flex items-center gap-2 sm:gap-3 bg-[#060ce9] px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-yellow-400 text-yellow-400 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
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
          <div className="p-4 sm:p-8 bg-[#060ce9]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-3 sm:space-y-4">
                  {/* Category Header */}
                  <Card className="bg-[#115ff4] text-center text-base sm:text-lg shadow-glow border-2 border-yellow-400">
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
                        className="bg-[#060ce9] cursor-pointer group shadow-lg border-2 border-[#115ff4] hover:border-yellow-400 transition-all duration-300 hover:scale-105"
                        onClick={() => {
                          setSelectedItem(item);
                          setIsModalOpen(true);
                        }}
                      >
                        <CardContent className="p-3 sm:p-4 text-center">
                          <div className="text-yellow-400 text-xl sm:text-2xl font-bold mb-1 sm:mb-2 drop-shadow">
                            ${item.points}
                          </div>
                          <div className="text-white text-xs sm:text-sm font-semibold mb-1 group-hover:text-yellow-300 transition-colors">
                            {item.content}
                          </div>
                          <div className="text-blue-200 text-xs opacity-90 mb-1">
                            {item.details.includes("(")
                              ? item.details.split("(")[0].trim()
                              : item.details}
                          </div>
                          <div className="text-blue-300 text-xs opacity-75">
                            {item.details.includes("(")
                              ? item.details
                                  .match(/\([^)]+\)/)?.[0]
                                  ?.replace(/[()]/g, "")
                              : ""}
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
          <div className="bg-[#060ce9] p-4 sm:p-8 border-t-4 border-yellow-400">
            {/* Download Resume Section */}
            <div className="text-center mb-6 sm:mb-8">
              <Button
                asChild
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3 shadow-glow transition-all duration-300"
              >
                <a href="/resume.pdf" download>
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 hover:from-yellow-400 hover:to-yellow-500 h-12 sm:h-16 text-base sm:text-lg font-bold border-2 border-green-500 glassy-card transition-all duration-300"
              >
                <a href="/projects">
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">View My Work</span>
                  <span className="sm:hidden">Projects</span>
                </a>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 hover:from-purple-400 hover:to-purple-600 h-12 sm:h-16 text-base sm:text-lg font-bold border-2 border-purple-500 glassy-card transition-all duration-300"
              >
                <a href="/news">
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="hidden sm:inline">Industry News</span>
                  <span className="sm:hidden">News</span>
                </a>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 hover:from-red-400 hover:to-red-600 h-12 sm:h-16 text-base sm:text-lg font-bold border-2 border-red-500 glassy-card transition-all duration-300 sm:col-span-2 lg:col-span-1"
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

      {/* Welcome Modal */}
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="glass max-w-2xl w-full p-8 animated-fadein">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-3xl font-bold text-center mb-2">
              Welcome to Jeopardy!
            </DialogTitle>
          </DialogHeader>
          <div className="text-blue-100 leading-relaxed text-lg mb-6 text-center">
            <h3 className="text-yellow-400 text-xl font-bold mb-4">
              About the Contestant
            </h3>
            <p>
              Bilingual Legal Professional and software engineer with a proven
              track record in both law and technology. Experienced in leveraging
              AI and modern software to streamline legal workflows, support
              high-stakes litigation, and deliver business value. Passionate
              about bridging the gap between legal expertise and innovative
              technology.
            </p>
          </div>
          <div className="text-center">
            <Button
              onClick={() => setShowWelcomeModal(false)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-3 shadow-glow transition-all duration-300"
            >
              Let&apos;s Play!
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Item Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="glass max-w-2xl w-full p-8 animated-fadein">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-2xl font-bold mb-2">
              {selectedItem?.content}
            </DialogTitle>
          </DialogHeader>
          <div className="text-blue-200 text-lg mb-4 text-center">
            {selectedItem?.details}
          </div>
          <div className="text-blue-100 leading-relaxed">
            {selectedItem?.description}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
