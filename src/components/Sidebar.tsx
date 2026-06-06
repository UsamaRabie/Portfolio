"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, Download, Home, User, Wrench, FileText, Folder, Mail } from "lucide-react";
import { SocialLink } from "@/types";
import ThemeToggle from "./ThemeToggle";

interface SidebarProps {
  name: string;
  social: SocialLink[];
  cvUrl: string;
  profileImage: string;
}

const navItems = [
  { label: "Home", href: "#hero", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Wrench },
  { label: "Resume", href: "#resume", icon: FileText },
  { label: "Work", href: "#portfolio", icon: Folder },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Sidebar({ name, social, cvUrl, profileImage }: SidebarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const toggle = useCallback(() => setOpen((p) => !p), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        onClick={toggle}
        className="lg:hidden fixed top-4 left-4 z-[9999] p-3 rounded-xl shadow-lg transition-all duration-200 active:scale-95"
        style={{
          background: "var(--sidebar-bg)",
          border: "1px solid var(--sidebar-border)",
          color: "var(--sidebar-heading)",
        }}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      <nav
        className={`fixed top-0 left-0 h-full w-[280px] z-[9997] flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center pt-10 pb-6 px-6">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 p-[3px]">
                <div
                  className="w-full h-full rounded-2xl overflow-hidden flex items-center justify-center text-4xl font-bold"
                  style={{ background: "var(--sidebar-bg)", color: "var(--sidebar-heading)" }}
                >
                  {profileImage ? (
                    <img src={profileImage} alt={name} className="w-full h-full object-cover" />
                  ) : (
                    name.split(" ").map(n => n[0]).join("")
                  )}
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-3xl blur-xl -z-10" />
            </div>
            <h1 className="text-base font-bold mb-1" style={{ color: "var(--sidebar-heading)" }}>{name}</h1>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{
                color: "var(--color-primary)",
                background: "rgba(99, 102, 241, 0.1)",
                border: "1px solid rgba(99, 102, 241, 0.2)",
              }}
            >
              MERN Stack Developer
            </span>
          </div>

          <div className="flex-1 px-4 overflow-y-auto">
            {navItems.map(({ label, href, icon: Icon }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-300 mb-1"
                style={{ color: "var(--sidebar-text)" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--sidebar-hover)"; e.currentTarget.style.color = "var(--sidebar-heading)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--sidebar-text)"; }}
              >
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>

          <div className="px-4 pb-6 space-y-3">
            <ThemeToggle />
            <div className="flex justify-center gap-3">
              {social.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: "var(--sidebar-hover)",
                    border: "1px solid var(--sidebar-border)",
                    color: "var(--sidebar-text)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--color-primary)";
                    e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--sidebar-text)";
                    e.currentTarget.style.borderColor = "var(--sidebar-border)";
                  }}
                  title={s.platform}
                >
                  {s.platform.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
            <a
              href={cvUrl}
              download
              onClick={close}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
            >
              <Download size={16} />
              Download CV
            </a>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[9996]"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={close}
        />
      )}
    </>
  );
}
