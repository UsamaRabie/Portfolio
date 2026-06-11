"use client";

import {
  Calendar, Phone, MapPin, Mail, GraduationCap, Briefcase,
  Download, Code2, BookOpen, Award, Users,
} from "lucide-react";
import { Fact, SocialLink } from "@/types";

interface AboutProps {
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  birthday: string;
  degree: string;
  freelance: string;
  name: string;
  profileImage: string;
  activities: string[];
  facts: Fact[];
  cvUrl: string;
  social?: SocialLink[];
}

const factIcons: Record<string, React.ElementType> = {
  code: Code2, folder: BookOpen, brain: Award, users: Users,
};

const infoItems = [
  { label: "Birthday", key: "birthday", icon: Calendar },
  { label: "Phone", key: "phone", icon: Phone },
  { label: "Location", key: "location", icon: MapPin },
  { label: "Email", key: "email", icon: Mail },
  { label: "Degree", key: "degree", icon: GraduationCap },
  { label: "Working Remotely", key: "freelance", icon: Briefcase },
];

export default function About({
  title, bio, email, phone, location, birthday, degree, freelance, name, profileImage, activities, facts, cvUrl, social,
}: AboutProps) {
  const infoValues = { email, phone, location, birthday, degree, freelance };

  return (
    <section id="about" className="py-24 relative" style={{ background: "var(--surface)" }}>
      <div className="section-container">
        <div className="section-header">
          <h2>
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="section-divider" />
          <p>{bio}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-center mb-20">
          <div className="lg:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-[3px]">
                <div className="w-full h-full rounded-2xl overflow-hidden" style={{ background: "var(--sidebar-bg)" }}>
                  {profileImage ? (
                    <img src={profileImage} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-8xl font-bold select-none" style={{ color: "var(--sidebar-heading)", opacity: 0.8 }}>
                        {name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--heading)" }}>
                {title}
              </h3>
              <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Faculty of Engineering, Minya University — Computer Systems Section
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {infoItems.map(({ label, key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 card-hover"
                  style={{ background: "var(--card)", border: "1px solid var(--border)" }}
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</p>
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--heading)" }}>
                      {infoValues[key as keyof typeof infoValues]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {social && social.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>Find me on:</span>
                <div className="flex gap-2">
                  {social.filter(s => s.platform.toLowerCase().includes("github") || s.platform.toLowerCase().includes("linkedin")).map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                      style={{
                        background: "var(--card)",
                        border: "1px solid var(--border)",
                        color: "var(--heading)",
                      }}
                      title={s.platform}
                    >
                      {s.platform.toLowerCase().includes("github")
                        ? <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        : <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-semibold mb-3" style={{ color: "var(--heading)" }}>Activities</h4>
              <div className="space-y-2">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-muted)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            <a
              href={cvUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-5">
          {facts.map((fact, i) => {
            const Icon = factIcons[fact.icon] || Award;
            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl text-center overflow-hidden card-hover w-44 sm:w-48"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={22} className="text-indigo-400" />
                  </div>
                  <div className="text-3xl font-extrabold mb-1 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                    {fact.value}
                  </div>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{fact.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
