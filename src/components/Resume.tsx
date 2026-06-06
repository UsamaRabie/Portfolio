"use client";

import { PortfolioData } from "@/types";
import { GraduationCap, Briefcase, Dot } from "lucide-react";

interface ResumeProps {
  resume: PortfolioData["resume"];
}

export default function Resume({ resume }: ResumeProps) {
  return (
    <section id="resume" className="py-24 relative" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        <div className="section-header">
          <h2>
            My <span className="gradient-text">Resume</span>
          </h2>
          <div className="section-divider" />
          <p>Seeking a position as a highly effective member where I can improve my knowledge and experience</p>
        </div>

        <div className="max-w-4xl mx-auto mb-14">
          <div
            className="p-6 md:p-8 rounded-2xl relative overflow-hidden"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-[60px]" />
            <h3 className="text-lg font-bold mb-4" style={{ color: "var(--heading)" }}>
              {resume.summary.title}
            </h3>
            <div className="space-y-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {resume.summary.items.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center">
                <GraduationCap size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: "var(--heading)" }}>
                {resume.education.title}
              </h3>
            </div>
            <div className="relative pl-8 space-y-8">
              <div className="absolute left-[15px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-indigo-400 via-cyan-400 to-transparent" />
              {resume.education.items.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-indigo-400 bg-white dark:bg-slate-900" />
                  <div
                    className="p-5 rounded-xl card-hover"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-3 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 text-indigo-400"
                    >
                      {item.period}
                    </span>
                    <h4 className="font-bold mb-2" style={{ color: "var(--heading)" }}>
                      {item.institution}
                    </h4>
                    <ul className="space-y-1.5">
                      {item.description.map((desc, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                          <Dot size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center">
                <Briefcase size={20} className="text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold" style={{ color: "var(--heading)" }}>
                {resume.experience.title}
              </h3>
            </div>
            <div className="relative pl-8 space-y-8">
              <div className="absolute left-[15px] top-2 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-indigo-400 to-transparent" />
              {resume.experience.items.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-8 top-1 w-4 h-4 rounded-full border-2 border-cyan-400 bg-white dark:bg-slate-900" />
                  <div
                    className="p-5 rounded-xl card-hover"
                    style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-3 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-400"
                    >
                      {item.period}
                    </span>
                    <h4 className="font-bold mb-2" style={{ color: "var(--heading)" }}>
                      {item.institution}
                    </h4>
                    <ul className="space-y-1.5">
                      {item.description.map((desc, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                          <Dot size={16} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                          {desc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
