"use client";
import { ExternalLink, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  description: string;
  url: string;
  category: string;
  features: string[];
  techStack?: string[];
}

const projects: Project[] = [
  {
    title: "Needle & Knead",
    description:
      "A professional massage therapy business website offering at-home massage services in Miami, Florida. The platform showcases various massage therapy services including Swedish, Deep Tissue, Sports Massage, TMJ treatment, and Reflexology.",
    url: "https://needleandknead.net/",
    category: "Business Website",
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
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Freelance Work</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A showcase of professional websites and platforms I&apos;ve developed,
          demonstrating expertise in both business solutions and legal
          technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="h-fit hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {project.category}
                  </CardDescription>
                </div>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Site
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="text-xs text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-blue-600 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.techStack && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">
                      Technology Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
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
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">
              Interested in Working Together?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              I specialize in creating professional websites and legal
              technology solutions. Whether you need a business website, legal
              tech platform, or custom web application, I can help bring your
              vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild>
                <a href="mailto:MiguelFernandez023@gmail.com">Get In Touch</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/resume.pdf" download>
                  Download Resume
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
