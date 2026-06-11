"use client";

import { useState, useEffect } from "react";
import { PortfolioData } from "@/types";
import { getDefaultData } from "@/lib/data";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Resume from "@/components/Resume";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [data, setData] = useState<PortfolioData>(getDefaultData());

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_data");
    if (saved) {
      try { setData(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Sidebar name={data.personal.name} social={data.social} cvUrl={data.personal.cvUrl} profileImage={data.personal.profileImage} />

      <main className="lg:ml-[280px]">
        <Hero name={data.personal.name} title={data.personal.title} subtitle={data.personal.subtitle} profileImage={data.personal.profileImage} />
        <About
          title={data.personal.title}
          bio={data.personal.bio}
          email={data.personal.email}
          phone={data.personal.phone}
          location={data.personal.location}
          birthday={data.personal.birthday}
          degree={data.personal.degree}
          freelance={data.personal.freelance}
          name={data.personal.name}
          profileImage={data.personal.profileImage}
          activities={data.activities}
          facts={data.facts}
          cvUrl={data.personal.cvUrl}
          social={data.social}
        />
        <Skills skills={data.skills} skillCategories={data.skillCategories} />
        <Resume resume={data.resume} />
        <Portfolio projects={data.projects} />
        <Contact
          email={data.contact.email}
          phone={data.contact.phone}
          location={data.contact.location}
        />
      </main>

      <Footer name={data.personal.name} social={data.social} />
    </div>
  );
}
