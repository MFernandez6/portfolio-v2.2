"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Download,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import PaperCard from "@/components/ghibli/PaperCard";
import SectionHeading from "@/components/ghibli/SectionHeading";
import WhisperQuote from "@/components/ghibli/WhisperQuote";
import GhibliDivider from "@/components/ghibli/GhibliDivider";
import {
  profile,
  journeyPillars,
  experience,
  education,
  licenses,
  skills,
  whisperQuotes,
} from "@/data/profile";

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Hero */}
      <section
        id="hero"
        className="ghibli-page-section min-h-[88vh] flex items-center pt-8 sm:pt-12"
      >
        <div className="ghibli-container">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center"
          >
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-terracotta-500/90 font-medium tracking-[0.2em] text-xs sm:text-sm uppercase mb-4"
              >
                ✦ A story of deliberate pivots ✦
              </motion.p>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.25rem] text-forest-900 leading-[1.08] mb-4 drop-shadow-sm">
                {profile.name}
              </h1>
              <p className="font-display text-xl sm:text-2xl text-forest-700/90 mb-6">
                {profile.title}
              </p>
              <p className="text-forest-700/85 text-lg leading-relaxed max-w-2xl mb-8">
                {profile.bio}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <a
                  href={`mailto:${profile.email}`}
                  className="ghibli-btn-soft inline-flex items-center gap-2 px-4 py-2 text-sm"
                >
                  <Mail size={16} className="text-terracotta-400" />
                  <span className="hidden sm:inline">{profile.email}</span>
                  <span className="sm:hidden">Email</span>
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\D/g, "")}`}
                  className="ghibli-btn-soft inline-flex items-center gap-2 px-4 py-2 text-sm"
                >
                  <Phone size={16} className="text-terracotta-400" />
                  {profile.phone}
                </a>
                <span className="ghibli-btn-soft inline-flex items-center gap-2 px-4 py-2 text-sm cursor-default">
                  <MapPin size={16} className="text-terracotta-400" />
                  {profile.location}
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/insurance-resume.pdf"
                  download
                  className="ghibli-btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm"
                >
                  <Download className="h-4 w-4" />
                  Insurance Resume
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="ghibli-btn-soft inline-flex items-center gap-2 px-6 py-2.5 text-sm"
                >
                  <Download className="h-4 w-4" />
                  General Resume
                </a>
                <Link
                  href="/projects"
                  className="ghibli-btn-soft inline-flex items-center gap-2 px-6 py-2.5 text-sm"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative mx-auto lg:mx-0"
            >
              <div className="ghibli-portrait-frame w-56 h-56 sm:w-72 sm:h-72 animate-gentle-float">
                <Image
                  src="/founder1.jpg"
                  alt={profile.name}
                  width={288}
                  height={288}
                  className="rounded-full object-cover w-full h-full"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          <WhisperQuote
            {...whisperQuotes[0]}
            className="mt-10 sm:mt-14"
            align="center"
          />
        </div>
      </section>

      <GhibliDivider />

      {/* Journey + current role */}
      <section id="journey" className="ghibli-page-section ghibli-section-wash">
        <div className="ghibli-container space-y-12 sm:space-y-14">
          <div>
            <SectionHeading
              subtitle="Four disciplines, one purpose—serving insureds with the full breadth of everything I've learned."
              subtitleClassName="max-w-none text-base sm:text-[1.05rem] lg:text-lg lg:whitespace-nowrap"
            >
              The Journey
            </SectionHeading>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {journeyPillars.map((pillar, i) => (
                <PaperCard key={pillar.id} delay={i * 0.1} className="p-6">
                  <span className="text-3xl mb-3 block" aria-hidden>
                    {pillar.icon}
                  </span>
                  <h3 className="font-display text-xl text-forest-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-forest-700/80 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </PaperCard>
              ))}
            </div>
          </div>

          <PaperCard className="p-8 sm:p-10 border-l-4 border-l-terracotta-400">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-meadow-100/80 text-forest-700 text-xs font-semibold uppercase tracking-wider mb-3">
                  Current Role
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-forest-900">
                  Insurance Adjuster
                </h3>
                <p className="text-terracotta-500 font-medium mt-1">
                  SafePoint MGA · Manatee Insurance · Florida
                </p>
                <p className="text-forest-700/80 mt-3 max-w-2xl leading-relaxed">
                  Licensed Florida 6-20 adjuster handling property claims—where
                  legal analysis, tech efficiency, and genuine care for insureds
                  finally meet.
                </p>
              </div>
              <div className="shrink-0 text-center sm:text-right">
                <p className="font-display text-sm text-forest-600 uppercase tracking-wider">
                  License
                </p>
                <p className="font-display text-lg text-forest-900">
                  {licenses[0].name}
                </p>
                <p className="text-forest-700/70 text-sm">
                  No. {licenses[0].number}
                </p>
              </div>
            </div>
          </PaperCard>

          <WhisperQuote {...whisperQuotes[1]} align="left" />
        </div>
      </section>

      <GhibliDivider />

      {/* Experience */}
      <section id="experience" className="ghibli-page-section">
        <div className="ghibli-container">
          <SectionHeading subtitle="From courtrooms to codebases to claims—in every chapter, the through-line is rigorous thinking and genuine service.">
            Experience
          </SectionHeading>

          <div className="relative">
            <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-meadow-400 via-terracotta-400/50 to-transparent" />

            <div className="space-y-5">
              {experience.map((job, i) => (
                <PaperCard
                  key={i}
                  delay={i * 0.08}
                  className="ml-10 sm:ml-14 p-6 relative"
                >
                  <div className="absolute -left-[2.15rem] sm:-left-[2.65rem] top-7 w-3 h-3 rounded-full bg-terracotta-400 border-2 border-paper-50 shadow-sm" />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-2">
                    <h3 className="font-display text-xl text-forest-900 flex items-center gap-2.5 flex-wrap">
                      {job.role}
                      {job.current && (
                        <span className="px-2 py-0.5 rounded-full bg-meadow-100/80 text-forest-700 text-xs font-medium font-sans tracking-normal">
                          Current
                        </span>
                      )}
                    </h3>
                    <span className="text-sm text-terracotta-500 font-medium shrink-0 sm:text-right">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-forest-700 font-medium text-sm">
                    {job.company} · {job.location}
                  </p>
                  <p className="text-forest-700/75 text-sm mt-2 leading-relaxed">
                    {job.description}
                  </p>
                </PaperCard>
              ))}
            </div>
          </div>

          <WhisperQuote
            {...whisperQuotes[2]}
            className="mt-12 sm:mt-14"
            align="right"
          />
        </div>
      </section>

      <GhibliDivider />

      {/* Education & Skills */}
      <section className="ghibli-page-section ghibli-section-wash">
        <div className="ghibli-container space-y-16 sm:space-y-20">
          <div>
            <SectionHeading subtitle="Two associate degrees, a master's, and a license earned through intentional reinvention.">
              Education & Credentials
            </SectionHeading>

            <div className="grid sm:grid-cols-2 gap-5">
              {education.map((edu, i) => (
                <PaperCard key={i} delay={i * 0.08} className="p-6">
                  <h3 className="font-display text-lg text-forest-900 leading-snug">
                    {edu.degree}
                  </h3>
                  <p className="text-terracotta-500 text-sm font-medium mt-1">
                    {edu.school} · {edu.period}
                  </p>
                  <p className="text-forest-700/75 text-sm mt-2 leading-relaxed">
                    {edu.note}
                  </p>
                </PaperCard>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading>Skills</SectionHeading>

            <div className="grid sm:grid-cols-3 gap-5">
              {skills.map((group, i) => (
                <PaperCard key={i} delay={i * 0.1} className="p-6">
                  <h3 className="font-display text-lg text-forest-900 mb-3">
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="text-forest-700/80 text-sm flex items-start gap-2"
                      >
                        <span className="text-meadow-400 mt-1.5">·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </PaperCard>
              ))}
            </div>

            <WhisperQuote
              {...whisperQuotes[3]}
              className="mt-12 sm:mt-14"
              align="left"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ghibli-page-section pb-24 sm:pb-28">
        <div className="ghibli-container max-w-3xl">
          <PaperCard className="p-10 sm:p-14 text-center">
            <h2 className="font-display text-3xl sm:text-4xl text-forest-900 mb-4">
              Let&apos;s connect
            </h2>
            <p className="text-forest-700/80 text-lg mb-8 leading-relaxed">
              Whether you&apos;re an insured seeking clarity, a firm looking for
              multidisciplinary talent, or a collaborator with an idea—I&apos;d love
              to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="ghibli-btn-primary inline-flex items-center gap-2 px-8 py-2.5"
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>
              <Link
                href="/projects"
                className="ghibli-btn-soft inline-flex items-center gap-2 px-8 py-2.5"
              >
                <ExternalLink className="h-4 w-4" />
                Projects
              </Link>
              <Link
                href="/news"
                className="ghibli-btn-soft inline-flex items-center gap-2 px-8 py-2.5"
              >
                Industry News
              </Link>
            </div>
          </PaperCard>

          <WhisperQuote
            {...whisperQuotes[4]}
            className="mt-12 sm:mt-14"
            align="center"
          />
        </div>
      </section>
    </div>
  );
}
