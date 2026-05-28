export type ProjectIcon = "shield" | "building" | "user" | "heart" | "scale";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  imageFit?: "cover" | "contain";
  liveUrl: string;
  githubUrl?: string;
  category: string;
  icon: ProjectIcon;
}

export const projects: Project[] = [
  {
    title: "Blackline Public Adjusters",
    description:
      "Marketing and intake site for a Florida-licensed public adjusting firm—forensic loss categories, policyholder advocacy content, adjuster-type comparisons, consultation forms, and a step-by-step claims workflow from inspection through negotiation.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Framer Motion",
      "Vercel",
    ],
    image: "/projects/blackline-public-adjusters.jpg",
    imageFit: "cover",
    liveUrl: "https://public-adjuster-v2.vercel.app/",
    category: "Insurance · Public Adjusting",
    icon: "scale",
  },
  {
    title: "ClaimSaver+",
    description:
      "Guided Florida PIP (no-fault) claim platform—flat-fee access to validated forms, secure document storage, claim progress tracking, reminders, and optional online notarization. Built so filers stay in control without contingency-fee representation.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "React Hook Form",
      "Vercel",
    ],
    image: "/projects/claimsaver-plus.jpg",
    imageFit: "cover",
    liveUrl: "https://www.claimsaverplus.com/",
    githubUrl: "https://github.com/MFernandez6/claimsaver-v2",
    category: "Legal Technology",
    icon: "shield",
  },
  {
    title: "Fernandez Public Adjusters",
    description:
      "Public adjusting firm website for policyholders—services, credentials, and clear paths to consultation so insureds understand how licensed advocacy differs from carrier-led adjusting.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn/ui",
      "Vercel",
    ],
    image: "/projects/fernandez-public-adjusters.jpg",
    imageFit: "cover",
    liveUrl: "https://www.fernandezpublicadjusters.com",
    githubUrl: "https://github.com/MFernandez6/public-adjusters-v1",
    category: "Insurance · Public Adjusting",
    icon: "scale",
  },
  {
    title: "River Run Miami",
    description:
      "Community website for a waterfront Miami condominium—building overview and gallery, board and property-management contacts, association resource categories, and announcements including 40-year recertification updates.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
    ],
    image: "/projects/river-run-miami.jpg",
    imageFit: "cover",
    liveUrl: "https://riverrunmiami.com/",
    category: "Community · Real Estate",
    icon: "building",
  },
  {
    title: "Portfolio Website",
    description:
      "This site—a narrative portfolio blending insurance adjusting, legal background, and software work, with resume downloads and project showcases.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
    ],
    image: "/projects/portfolio.jpg",
    imageFit: "cover",
    liveUrl: "https://www.miguelangelfernandez.com",
    githubUrl: "https://github.com/MFernandez6/portfolio-v2.2",
    category: "Personal Portfolio",
    icon: "user",
  },
  {
    title: "Needle & Knead",
    description:
      "Massage therapy business website with service listings, booking information, and client-facing brand presentation.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Vercel"],
    image: "/projects/needle-and-knead.jpg",
    imageFit: "cover",
    liveUrl: "https://www.needleandknead.net",
    githubUrl: "https://github.com/MFernandez6/knead-n-needles",
    category: "Business Website",
    icon: "heart",
  },
];
