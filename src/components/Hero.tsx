"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  name: string;
  title: string;
  subtitle: string[];
  profileImage: string;
}

export default function Hero({ name, title, subtitle, profileImage }: HeroProps) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = subtitle[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx + 1));
        setCharIdx((p) => p + 1);
      }, 80);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIdx - 1));
        setCharIdx((p) => p - 1);
      }, 40);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((p) => (p + 1) % subtitle.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, subtitle]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--hero-bg)" }}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg5OSwxMDIsMjQxLDAuMDYpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-500/20 dark:bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 dark:bg-cyan-500/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
        {profileImage && (
          <div className="mb-8 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-full blur-2xl" />
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-[3px] border-indigo-500/50 shadow-xl shadow-indigo-500/20">
                <img src={profileImage} alt={name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        )}
        <div
          className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{
            background: "var(--hero-badge)",
            border: "1px solid var(--hero-badge-border)",
            color: "var(--color-primary)",
          }}
        >
          {title}
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.1]">
          <span style={{ color: "var(--hero-text)" }}>Hi, I&apos;m </span>
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        <div className="text-xl sm:text-2xl md:text-3xl mb-10 h-10" style={{ color: "var(--hero-muted)" }}>
          <span>I&apos;m a </span>
          <span
            className="font-semibold border-r-2 pr-1"
            style={{ color: "var(--hero-text)", borderRightColor: "var(--color-primary)" }}
          >
            {text}
            <span className="animate-pulse">|</span>
          </span>
        </div>

        <a
          href="#about"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 group"
        >
          Explore My Work
          <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
