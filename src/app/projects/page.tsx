"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  Globe,
  Code,
  Shield,
  Mail,
  Download,
  User,
  Heart,
} from "lucide-react";

const projects = [
  {
    title: "Fernandez Public Adjusters",
    description:
      "Professional public adjusting firm website helping policyholders maximize insurance claim settlements. Features modern design, contact forms, service pages, blog section, and SEO optimization.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Lucide React",
    ],
    image: "/fpa-logo.svg",
    liveUrl: "https://www.fernandezpublicadjusters.com",
    githubUrl: "https://github.com/MFernandez6/public-adjusters-v1",
    category: "Legal Services",
    icon: Shield,
  },
  {
    title: "ClaimSaver+",
    description:
      "Legal tech platform for accident recovery and claim filing. Features user-friendly accident form submission, attorney matching, secure document management, and real-time case updates.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "React Hook Form",
    ],
    image: "/long-logo-ClaimSaver.jpg",
    liveUrl: "https://www.claimsaverplus.com",
    githubUrl: "https://github.com/MFernandez6/claimsaver-v2",
    category: "Legal Technology",
    icon: Shield,
  },
  {
    title: "Portfolio Website",
    description:
      "Professional portfolio website showcasing legal and software engineering expertise. Features modern design, project showcase, news aggregation, and responsive layout.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Lucide React",
    ],
    image: "/portfolio.jpg",
    liveUrl: "https://www.miguelangelfernandez.com",
    githubUrl: "https://github.com/MFernandez6/portfolio-v2.2",
    category: "Personal Portfolio",
    icon: User,
  },
  {
    title: "Needle & Knead",
    description:
      "Professional massage therapy business website with modern design, service listings, appointment booking, and client testimonials.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js"],
    image: "/logo-PNG.png",
    liveUrl: "https://www.needleandknead.net",
    githubUrl: "https://github.com/MFernandez6/knead-n-needles",
    category: "Business Website",
    icon: Heart,
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background with animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-400/8 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Code className="h-6 w-6 text-slate-900" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 drop-shadow-lg">
              My Projects
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Explore my portfolio of projects showcasing expertise in web
            development, legal technology, and innovative solutions. Each
            project demonstrates technical skills, problem-solving abilities,
            and attention to detail.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={index}
                className="group relative animated-fadein"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card
                  className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() =>
                    window.open(
                      project.liveUrl,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  {/* Project Header */}
                  <CardHeader className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div>
                        <CardTitle className="text-yellow-400 text-2xl font-bold">
                          {project.title}
                        </CardTitle>
                        <p className="text-slate-400 text-sm font-medium">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Project Content */}
                  <CardContent className="p-6">
                    {/* Project Image */}
                    <div className="relative h-48 w-full overflow-hidden rounded-lg mb-6">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`transition-transform duration-300 group-hover:scale-105 ${
                          project.title === "Needle & Knead"
                            ? "object-contain p-4 bg-white"
                            : "object-cover"
                        }`}
                      />
                      {project.title !== "Needle & Knead" && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      )}
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-yellow-400 font-semibold mb-3">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div
                      className="flex gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        asChild
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold flex-1"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 font-bold"
                      >
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl border border-yellow-400/30 p-8">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Ready to Collaborate?
            </h2>
            <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
              I&apos;m always interested in new opportunities and exciting
              projects. Whether you need a website, legal tech solution, or
              innovative software development, let&apos;s discuss how I can help
              bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 font-bold px-8 py-3"
              >
                <a href="mailto:MiguelFernandez023@gmail.com">
                  <Mail className="h-5 w-5 mr-2" />
                  Get In Touch
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-slate-900 font-bold px-8 py-3"
              >
                <a href="/resume.pdf" download>
                  <Download className="h-5 w-5 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
