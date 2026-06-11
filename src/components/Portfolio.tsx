"use client";

import { useState } from "react";
import { ExternalLink, GitBranch } from "lucide-react";
import { Project } from "@/types";
import { projectIconRegistry } from "@/lib/projectIcons";

interface PortfolioProps {
  projects: Project[];
}

function hasUrl(url?: string) {
  return url && url !== "#" && url.length > 0;
}

function ProjectIcon({ project }: { project: Project }) {
  const IconComponent = project.icon ? projectIconRegistry[project.icon] : null;
  if (IconComponent) return <IconComponent size={64} className="text-indigo-400/60" />;
  return (
    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-2xl font-bold">
      {project.title[0]}
    </div>
  );
}

export default function Portfolio({ projects }: PortfolioProps) {
  const [filter, setFilter] = useState("all");
  const categories = [...new Set(projects.map((p) => p.category))];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 relative" style={{ background: "var(--background)" }}>
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="section-container">
        <div className="section-header">
          <h2>
            Featured <span className="gradient-text">Work</span>
          </h2>
          <div className="section-divider" />
          <p>Educational projects I built to sharpen my frontend skills</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {["all", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {cat === "all" ? "All Projects" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden card-hover"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="aspect-video flex items-center justify-center relative overflow-hidden" style={{ background: "var(--card)" }}>
                <ProjectIcon project={project} />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/90 via-indigo-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-5 gap-3">
                  {hasUrl(project.demoUrl) && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition-all"
                    >
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  )}
                  {hasUrl(project.githubUrl) && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition-all"
                    >
                      <GitBranch size={14} /> Source
                    </a>
                  )}
                </div>
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-bold mt-1 mb-1.5" style={{ color: "var(--heading)" }}>
                  {project.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-16" style={{ color: "var(--text-muted)" }}>
            No projects found in this category.
          </p>
        )}

        <div className="text-center mt-16">
          <p className="text-lg font-semibold" style={{ color: "var(--heading)" }}>
            🚀 More projects coming soon — I never stop learning!
          </p>
        </div>
      </div>
    </section>
  );
}
