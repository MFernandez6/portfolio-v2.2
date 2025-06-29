"use client";
import {
  ExternalLink,
  Globe,
  Download,
  Mail,
  Star,
  Code,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  url: string;
  category: string;
  features: string[];
  techStack?: string[];
  image: string;
}

const projects: Project[] = [
  {
    title: "Needle & Knead",
    description:
      "A professional massage therapy business website offering at-home massage services in Miami, Florida. The platform showcases various massage therapy services including Swedish, Deep Tissue, Sports Massage, TMJ treatment, and Reflexology.",
    url: "https://needleandknead.net/",
    category: "Business Website",
    image: "/background.JPG",
    features: [
      "Service showcase and booking system",
      "Professional therapist profiles",
      "Multiple massage therapy services",
      "Contact and scheduling functionality",
      "Mobile-responsive design",
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "ClaimSaver+",
    description:
      "A comprehensive accident recovery platform that streamlines the process of filing accident claims and connecting users with qualified attorneys. The platform provides real-time form validation, secure document management, and attorney matching services for Florida and New York.",
    url: "https://www.claimsaverplus.net/",
    category: "Legal Tech Platform",
    image: "/long-logo-ClaimSaver.jpg",
    features: [
      "No-fault form filing with real-time validation",
      "Secure document management system",
      "Attorney matching network (FL & NY)",
      "Real-time case progress tracking",
      "Flat-fee pricing model ($500)",
      "24/7 support and consultation",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Secure APIs",
      "Document Management",
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Background with animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-yellow-400/3 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <Star className="h-6 w-6 text-blue-900" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-yellow-400 drop-shadow-lg">
              Freelance Work
            </h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            A showcase of professional websites and platforms I&apos;ve
            developed, demonstrating expertise in both business solutions and
            legal technology.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Card className="relative bg-white/10 backdrop-blur-md border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full flex flex-col">
                {/* Project Image */}
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <CardHeader className="bg-gradient-to-r from-blue-800/50 to-blue-700/50 border-b border-white/10">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-3 text-yellow-400 text-2xl font-bold mb-2">
                        <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                          <Globe className="h-5 w-5 text-yellow-400" />
                        </div>
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-blue-200 text-lg font-medium">
                        {project.category}
                      </CardDescription>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 font-bold border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Site
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-blue-900/50 flex-1 flex flex-col">
                  <p className="text-blue-100 text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="space-y-6 flex-1">
                    <div>
                      <h4 className="flex items-center gap-2 font-bold text-yellow-400 text-lg mb-3">
                        <Zap className="h-5 w-5" />
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="text-blue-200 flex items-start gap-3 text-sm"
                          >
                            <span className="text-yellow-400 mt-1 text-lg">
                              •
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.techStack && (
                      <div>
                        <h4 className="flex items-center gap-2 font-bold text-yellow-400 text-lg mb-3">
                          <Code className="h-5 w-5" />
                          Technology Stack:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-blue-700/50 border border-blue-600/50 text-blue-200 text-sm rounded-full font-medium hover:bg-blue-600/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Mail className="h-6 w-6 text-blue-900" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-400">
                  Interested in Working Together?
                </h3>
              </div>
              <p className="text-blue-200 text-lg mb-6 leading-relaxed">
                I specialize in creating professional websites and legal
                technology solutions. Whether you need a business website, legal
                tech platform, or custom web application, I can help bring your
                vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-blue-900 font-bold text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a
                    href="mailto:MiguelFernandez023@gmail.com"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-5 w-5" />
                    Get In Touch
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-500"
                >
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
