"use client";

import {
  Calendar, Phone, MapPin, Mail, GraduationCap, Briefcase,
  Download, Code2, BookOpen, Award, Users
} from "lucide-react";
import { Fact } from "@/types";

interface AboutProps {
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
  { label: "Freelance", key: "freelance", icon: Briefcase },
];

export default function About({
  bio, email, phone, location, birthday, degree, freelance, name, profileImage, activities, facts, cvUrl,
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
                MERN Stack Developer &amp; Web Developer
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {facts.map((fact, i) => {
            const Icon = factIcons[fact.icon] || Award;
            return (
              <div
                key={i}
                className="group relative p-6 rounded-2xl text-center overflow-hidden card-hover"
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
