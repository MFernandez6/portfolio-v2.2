"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Globe,
  Shield,
  Mail,
  Download,
  User,
  Heart,
  ArrowLeft,
  Building2,
  Scale,
  type LucideIcon,
} from "lucide-react";
import PaperCard from "@/components/ghibli/PaperCard";
import SectionHeading from "@/components/ghibli/SectionHeading";
import { projects, type ProjectIcon } from "@/data/projects";
import { profile } from "@/data/profile";

const iconMap: Record<ProjectIcon, LucideIcon> = {
  shield: Shield,
  building: Building2,
  user: User,
  heart: Heart,
  scale: Scale,
};

export default function ProjectsPage() {
  return (
    <div className="ghibli-page-section">
      <div className="ghibli-container">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-forest-700/80 hover:text-forest-900 text-sm mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back home
        </Link>

        <SectionHeading subtitle="Tools and sites built at the intersection of law, insurance, and technology.">
          Projects
        </SectionHeading>

        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const IconComponent = iconMap[project.icon];
            const imageFit = project.imageFit ?? "cover";

            return (
              <PaperCard
                key={project.title}
                delay={index * 0.08}
                className="overflow-hidden group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-meadow-100 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-forest-800" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-forest-900">
                        {project.title}
                      </h3>
                      <p className="text-terracotta-500 text-xs font-medium uppercase tracking-wider">
                        {project.category}
                      </p>
                    </div>
                  </div>

                  <div className="relative h-44 w-full overflow-hidden rounded-xl mb-4 border border-paper-300 bg-paper-100/50">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className={`transition-transform duration-500 group-hover:scale-105 ${
                        imageFit === "contain"
                          ? "object-contain p-4"
                          : "object-cover"
                      }`}
                    />
                  </div>

                  <p className="text-forest-700/80 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full bg-meadow-50 text-forest-700 text-xs border border-meadow-100"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`ghibli-btn-primary inline-flex justify-center items-center gap-2 py-2 text-sm ${
                        project.githubUrl ? "flex-1" : "w-full"
                      }`}
                    >
                      <Globe className="h-4 w-4" />
                      Live Site
                    </a>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ghibli-btn-soft flex-1 inline-flex justify-center items-center gap-2 py-2 text-sm"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </PaperCard>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <PaperCard className="p-10 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl text-forest-900 mb-3">
              Interested in collaborating?
            </h2>
            <p className="text-forest-700/80 mb-6">
              I build at the crossroads of insurance, law, and software.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="ghibli-btn-primary inline-flex items-center gap-2 px-6 py-2.5"
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>
              <a
                href="/resume.pdf"
                download
                className="ghibli-btn-soft inline-flex items-center gap-2 px-6 py-2.5"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>
          </PaperCard>
        </motion.div>
      </div>
    </div>
  );
}
