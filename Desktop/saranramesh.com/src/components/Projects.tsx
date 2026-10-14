import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { track } from "@vercel/analytics/react";

interface Project {
  title: string;
  description: string;
  pills: { label: string; icon?: string; adaptive?: boolean }[];
  status: "live" | "in-dev" | "coming-soon";
  color: string;
  link?: string;
  landingUrl?: string;
  disabled?: boolean;
  thumbnail?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Pilet",
    description:
      "A mobile-first creative studio. Save references and inspiration from any app, and keep the whole project in one pile.",
    pills: [
      { label: "Claude Code", icon: "https://cdn.simpleicons.org/anthropic/black", adaptive: true },
    ],
    status: "in-dev",
    color: "secondary",
    disabled: true,
    landingUrl: "https://pilet.app",
    thumbnail: "/pilet-thumbnail.png",
  },
  {
    title: "Michigan VIP",
    description:
      "A gameday app for University of Michigan season ticket holders. The credential carries your name, fan rank, and consecutive seasons. Designed to feel worth keeping.",
    pills: [
      { label: "Claude Code", icon: "https://cdn.simpleicons.org/anthropic/black", adaptive: true },
      { label: "Lovable", icon: "https://cdn.simpleicons.org/lovable/black", adaptive: true },
    ],
    status: "live",
    color: "secondary",
    link: "/michigan-vip",
    thumbnail: "/michigan-vip-thumbnail.png",
  },
  {
    title: "Scenius",
    description:
      "A platform for building creative teams and enabling long-term online collaboration. Designed and built end-to-end, from research to a fully functioning product.",
    pills: [
      { label: "Replit", icon: "https://cdn.simpleicons.org/replit/black", adaptive: true },
      { label: "Figma", icon: "https://cdn.simpleicons.org/figma/black", adaptive: true },
      { label: "React", icon: "https://cdn.simpleicons.org/react/black", adaptive: true },
    ],
    status: "live",
    color: "primary",
    link: "/scenius",
    thumbnail: "/scenius-thumbnail.png",
  },
  {
    title: "Attune",
    description:
      "A paired wearable and companion app that captures resonance between people in real time using earbuds. Built at FigBuild 2026 as a team of 4 in 72 hours.",
    pills: [
      { label: "Claude Code", icon: "https://cdn.simpleicons.org/anthropic/black", adaptive: true },
      { label: "Figma", icon: "https://cdn.simpleicons.org/figma/black", adaptive: true },
      { label: "Antigravity", icon: "/icons/antigravity.png", mono: true },
    ],
    status: "live",
    color: "accent",
    link: "/attune",
    thumbnail: "/attune-thumbnail.png",
  },
];

const statusConfig = {
  live: { label: "Shipped", classes: "sticker-primary" },
  "in-dev": { label: "Page Coming Soon", classes: "sticker-accent" },
  "coming-soon": { label: "Soon...", classes: "sticker-secondary" },
};

const Projects = ({ scored }: { scored?: boolean }) => {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 relative">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <span className="sticker-primary text-xs py-1 mb-4 inline-flex">
          Projects
        </span>
        <h2 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-foreground mt-4">
          Things I've{" "}
          <span className="text-accent">shipped</span>
        </h2>
      </motion.div>

      {/* Project cards */}
      <div className="flex flex-col gap-10 relative z-10 max-w-5xl mx-auto">
        {PROJECTS.map((project, i) => {
          const isInternal = project.link?.startsWith("/");
          const Wrapper = project.link ? (isInternal ? Link : "a") : "div";
          const wrapperProps = project.link
            ? isInternal
              ? { to: project.link, onClick: () => track("project_card_clicked", { project: project.title }) }
              : { href: project.link, target: "_blank", rel: "noopener noreferrer", onClick: () => track("project_card_clicked", { project: project.title }) }
            : {};


          return (
            <motion.div
              key={project.title}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.12,
              }}
              whileHover={project.link && !project.disabled ? { y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } } : undefined}
            >
              <Wrapper
                {...(wrapperProps as any)}
                className={`block rounded-2xl border-2 border-foreground/15 bg-card overflow-hidden transition-all duration-300 ${project.link && !project.disabled ? "cursor-pointer hover:border-accent" : ""} ${project.disabled && !project.landingUrl ? "opacity-40 pointer-events-none" : ""}`}
                style={{ boxShadow: "var(--shadow-offset-md) var(--shadow-card)" }}
              >
                {/* Browser chrome bar */}
                <div className={`flex items-center justify-between px-5 py-3 border-b border-foreground/10${project.disabled ? " opacity-40" : ""}`}>
                  <div className={`flex items-center gap-1.5${project.disabled ? " grayscale" : ""}`}>
                    <span className="w-3 h-3 rounded-full bg-foreground" />
                    <span className="w-3 h-3 rounded-full bg-primary" />
                    <span className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  {/* Status badge */}
                  <span className={`text-xs py-1 ${statusConfig[project.status].classes}`}>
                    {statusConfig[project.status].label}
                  </span>
                </div>

                {/* Card body */}
                <div className="grid grid-cols-1 md:grid-cols-2 relative">
                  {/* Left — visual area */}
                  <div className={`relative bg-accent/10 min-h-[200px] ${project.thumbnail ? "aspect-video md:aspect-auto" : "aspect-video md:aspect-video"} flex items-center justify-center overflow-hidden${project.disabled ? " opacity-40" : ""}`}>
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover block scale-[1.028]"
                      />
                    ) : null}
                  </div>

                  {/* Right — content */}
                  <div className="p-6 md:p-8 flex flex-col justify-center gap-4">
                    <div className={project.disabled ? "opacity-40 grayscale flex flex-col gap-4" : "flex flex-col gap-4"}>
                      {/* Tool pills */}
                      <div className="flex flex-wrap gap-2">
                        {project.pills.map((p) => (
                          <span
                            key={p.label}
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-body font-bold uppercase tracking-wider rounded-full bg-foreground text-background"
                          >
                            {p.icon && (
                              <img
                                src={p.icon}
                                alt={p.label}
                                className={`w-3.5 h-3.5${p.adaptive ? " invert dark:invert-0" : ""}${(p as any).mono ? " brightness-0 invert dark:invert-0" : ""}`}
                                loading="lazy"
                              />
                            )}
                            {p.label}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display font-extrabold text-3xl md:text-4xl text-foreground leading-tight">
                        {project.title}
                      </h3>

                      <p className="font-body text-sm md:text-base text-foreground/85 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {project.landingUrl && (
                      <a
                        href={project.landingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); track("project_landing_clicked", { project: project.title }); }}
                        className="sticker-accent pointer-events-auto self-start hover:brightness-110 hover:-translate-y-0.5 transition-all duration-150"
                      >
                        Visit Landing Page →
                      </a>
                    )}
                  </div>
                </div>
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
