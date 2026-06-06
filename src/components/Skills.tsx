"use client";

import { useEffect, useRef, useState } from "react";
import { Skill } from "@/types";
import { iconRegistry } from "@/lib/icons";
import { VscJson } from "react-icons/vsc";

interface SkillsProps {
  skills: Skill[];
}

const getSkillIcon = (skill: Skill) => {
  if (skill.icon && iconRegistry[skill.icon]) {
    const Icon = iconRegistry[skill.icon];
    return <Icon size={28} />;
  }
  const Icon = iconRegistry[skill.name];
  if (Icon) return <Icon size={28} />;

  const lower = skill.name.toLowerCase();
  if (lower.includes("data structure") || lower.includes("oop") || lower.includes("stl")) {
    const CIcn = iconRegistry["C++"];
    return CIcn ? <CIcn size={28} /> : <VscJson size={28} />;
  }
  if (lower.includes("algorithm") || lower.includes("problem")) {
    return <VscJson size={28} />;
  }

  return <VscJson size={28} />;
};

export default function Skills({ skills }: SkillsProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section id="skills" className="py-24 relative overflow-hidden" style={{ background: "var(--background)" }}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="section-container" ref={ref}>
        <div className="section-header">
          <h2>
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="section-divider" />
          <p>Technologies and tools I use to build modern web applications</p>
        </div>

        <div className="space-y-14">
          {categories.map((category, catIdx) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-6 capitalize flex items-center gap-3" style={{ color: "var(--heading)" }}>
                <span className="w-8 h-[2px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                {category === "mern" ? "MERN Stack" : category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill, i) => (
                    <div
                      key={skill.name}
                      className="group relative p-5 rounded-2xl text-center card-hover"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        opacity: visible ? 1 : 0,
                        transform: visible ? "translateY(0)" : "translateY(30px)",
                        transition: `all 0.5s ease-out ${(catIdx + i) * 0.05}s`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/[0.03] to-cyan-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative flex flex-col items-center gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center text-indigo-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-indigo-500/20">
                          {getSkillIcon(skill)}
                        </div>
                        <span className="text-sm font-semibold text-center leading-tight" style={{ color: "var(--heading)" }}>
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
