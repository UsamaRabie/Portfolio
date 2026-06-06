export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Fact {
  icon: string;
  value: string;
  label: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface ResumeItem {
  period: string;
  institution: string;
  description: string[];
}

export interface ResumeSection {
  title: string;
  items: ResumeItem[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  demoUrl: string;
  githubUrl: string;
  icon?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    subtitle: string[];
    email: string;
    phone: string;
    location: string;
    birthday: string;
    degree: string;
    freelance: string;
    bio: string;
    profileImage: string;
    cvUrl: string;
  };
  social: SocialLink[];
  activities: string[];
  facts: Fact[];
  skills: Skill[];
  resume: {
    summary: { title: string; items: string[] };
    education: ResumeSection;
    experience: ResumeSection;
  };
  projects: Project[];
  contact: ContactInfo;
}
