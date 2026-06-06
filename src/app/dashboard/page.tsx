"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PortfolioData, Project, Skill, SocialLink, Fact } from "@/types";
import { getDefaultData } from "@/lib/data";
import ImageUploader from "@/components/ImageUploader";
import { iconList } from "@/lib/icons";
import { projectIconList } from "@/lib/projectIcons";
import Modal from "@/components/dashboard/Modal";
import ConfirmDialog from "@/components/dashboard/ConfirmDialog";
import ToastContainer, { showToast } from "@/components/dashboard/Toast";
import ThemeToggle from "@/components/ThemeToggle";
import {
  LogOut, Plus, Trash2, Edit3, Menu,
  User, Globe, Award, Wrench, FileText, Folder, Mail,
  ChevronLeft,
} from "lucide-react";

const tabs = [
  { id: "personal", label: "Personal", icon: User },
  { id: "social", label: "Social", icon: Globe },
  { id: "activities", label: "Activities", icon: Award },
  { id: "facts", label: "Facts", icon: Award },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "projects", label: "Projects", icon: Folder },
  { id: "contact", label: "Contact", icon: Mail },
];

const SKILL_CATEGORIES = ["mern", "frontend", "backend", "programming"];

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData>(getDefaultData());
  const [activeTab, setActiveTab] = useState("personal");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("dashboard_auth");
    if (auth !== "authenticated") router.push("/dashboard/login");
  }, [router]);

  useEffect(() => {
    const savedData = localStorage.getItem("portfolio_data");
    if (savedData) {
      try { setData(JSON.parse(savedData)); }
      catch { /* ignore */ }
    }
  }, []);

  const persist = useCallback((newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem("portfolio_data", JSON.stringify(newData));
  }, []);

  const update = useCallback(<K extends keyof PortfolioData>(section: K, value: PortfolioData[K]) => {
    persist({ ...data, [section]: value });
  }, [data, persist]);

  const handleLogout = () => {
    localStorage.removeItem("dashboard_auth");
    router.push("/dashboard/login");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex" style={{ background: "var(--background)" }}>
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen((p) => !p)}
        className="lg:hidden fixed top-4 left-4 z-[100] p-2.5 rounded-xl shadow-lg"
        style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--heading)" }}
        aria-label="Toggle menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={closeSidebar} />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 bg-white dark:bg-gray-900 border-r
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-16"}
        `}
        style={{ borderColor: "var(--border)" }}
      >
        <div className="p-3 border-b min-h-[49px]" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold whitespace-nowrap" style={{ color: "var(--heading)" }}>
              {sidebarOpen ? "Dashboard" : "D"}
            </span>
            <button
              onClick={() => setSidebarOpen((p) => !p)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronLeft size={16} className={`transition-transform ${!sidebarOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); closeSidebar(); }}
              className={`w-full flex items-center justify-start gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <tab.icon size={16} className="flex-shrink-0" />
              <span className={`${sidebarOpen ? "lg:inline" : "lg:hidden"}`}>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-2 border-t space-y-2" style={{ borderColor: "var(--border)" }}>
          <ThemeToggle compact={!sidebarOpen} />
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
          >
            <LogOut size={14} />
            <span className={`${sidebarOpen ? "lg:inline" : "lg:hidden"}`}>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-4 pt-16 lg:pt-4 md:p-6 lg:p-8" style={{ minHeight: "100vh" }}>
        <div className="max-w-3xl mx-auto">
          {activeTab === "personal" && <PersonalSection data={data} persist={persist} />}
          {activeTab === "social" && <SocialSection data={data} update={update} />}
          {activeTab === "activities" && <ActivitiesSection data={data} update={update} />}
          {activeTab === "facts" && <FactsSection data={data} update={update} />}
          {activeTab === "skills" && <SkillsSection data={data} update={update} />}
          {activeTab === "resume" && <ResumeSection data={data} update={update} />}
          {activeTab === "projects" && <ProjectsSection data={data} update={update} />}
          {activeTab === "contact" && <ContactSection data={data} update={update} />}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

/* ─────── Personal ─────── */

function PersonalSection({ data, persist }: { data: PortfolioData; persist: (d: PortfolioData) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...data.personal, subtitle: data.personal.subtitle.join(", ") });

  const handleSave = () => {
    persist({ ...data, personal: { ...form, subtitle: form.subtitle.split(", ").filter(Boolean) } });
    setOpen(false);
    showToast("success", "Personal info saved");
  };

  return (
    <SectionCard title="Personal Info" icon={User} onEdit={() => { setForm({ ...data.personal, subtitle: data.personal.subtitle.join(", ") }); setOpen(true); }}>
      <div className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <p><strong style={{ color: "var(--heading)" }}>Name:</strong> {data.personal.name}</p>
        <p><strong style={{ color: "var(--heading)" }}>Email:</strong> {data.personal.email}</p>
        <p><strong style={{ color: "var(--heading)" }}>Phone:</strong> {data.personal.phone}</p>
        <p><strong style={{ color: "var(--heading)" }}>Location:</strong> {data.personal.location}</p>
        {data.personal.profileImage && (
          <img src={data.personal.profileImage} alt="" className="w-16 h-16 rounded-lg object-cover mt-2" />
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit Personal Info">
        <div className="space-y-4">
          <ImageUploader value={form.profileImage} onChange={(url) => setForm((f) => ({ ...f, profileImage: url }))} label="Profile Image" />
          {["name", "title", "email", "phone", "location", "birthday", "degree", "freelance", "cvUrl"].map((key) => (
            <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
              <input type="text" value={(form as any)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="input" />
            </Field>
          ))}
          <Field label="Bio">
            <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} rows={3} className="input" />
          </Field>
          <Field label="Subtitle (comma separated)">
            <input type="text" value={form.subtitle} onChange={(e) => setForm((f) => ({ ...f, subtitle: e.target.value }))} className="input" />
          </Field>
          <SaveBtn onClick={handleSave} />
        </div>
      </Modal>
    </SectionCard>
  );
}

/* ─────── Social ─────── */

function SocialSection({ data, update }: any) {
  const items: SocialLink[] = data.social;
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<SocialLink>({ platform: "", url: "", icon: "" });
  const [delIdx, setDelIdx] = useState<number | null>(null);

  const openAdd = () => { setForm({ platform: "", url: "", icon: "" }); setEditIdx(-1); };
  const openEdit = (i: number) => { setForm({ ...items[i] }); setEditIdx(i); };
  const saveItem = () => {
    const u = [...items];
    if (editIdx === -1) u.push(form);
    else if (editIdx !== null) u[editIdx] = form;
    update("social", u);
    setEditIdx(null);
    showToast("success", editIdx === -1 ? "Link added" : "Link updated");
  };
  const deleteItem = () => {
    if (delIdx === null) return;
    update("social", items.filter((_, j) => j !== delIdx));
    setDelIdx(null);
    showToast("success", "Link deleted");
  };

  return (
    <SectionCard title="Social Links" icon={Globe} onAdd={openAdd}>
      <div className="space-y-2">
        {items.map((link, i) => (
          <ItemRow key={i} label={link.platform || "Untitled"} onEdit={() => openEdit(i)} onDelete={() => setDelIdx(i)} />
        ))}
      </div>

      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title={editIdx === -1 ? "Add Link" : "Edit Link"}>
        <div className="space-y-4">
          {(["platform", "url", "icon"] as const).map((key) => (
            <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
              <input type="text" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="input" />
            </Field>
          ))}
          <SaveBtn onClick={saveItem} />
        </div>
      </Modal>

      <ConfirmDialog
        open={delIdx !== null}
        title="Delete Link"
        message="Are you sure you want to delete this social link?"
        onConfirm={deleteItem}
        onCancel={() => setDelIdx(null)}
      />
    </SectionCard>
  );
}

/* ─────── Activities ─────── */

function ActivitiesSection({ data, update }: any) {
  const items: string[] = data.activities;
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState("");
  const [delIdx, setDelIdx] = useState<number | null>(null);

  const openAdd = () => { setForm(""); setEditIdx(-1); };
  const openEdit = (i: number) => { setForm(items[i]); setEditIdx(i); };
  const saveItem = () => {
    const u = [...items];
    if (editIdx === -1) u.push(form);
    else if (editIdx !== null) u[editIdx] = form;
    update("activities", u);
    setEditIdx(null);
    showToast("success", editIdx === -1 ? "Activity added" : "Activity updated");
  };
  const deleteItem = () => {
    if (delIdx === null) return;
    update("activities", items.filter((_, j) => j !== delIdx));
    setDelIdx(null);
    showToast("success", "Activity deleted");
  };

  return (
    <SectionCard title="Activities" icon={Award} onAdd={openAdd}>
      <div className="space-y-2">
        {items.map((a, i) => (
          <ItemRow key={i} label={a} onEdit={() => openEdit(i)} onDelete={() => setDelIdx(i)} />
        ))}
      </div>

      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title={editIdx === -1 ? "Add Activity" : "Edit Activity"}>
        <div className="space-y-4">
          <Field label="Activity">
            <input type="text" value={form} onChange={(e) => setForm(e.target.value)} className="input" />
          </Field>
          <SaveBtn onClick={saveItem} />
        </div>
      </Modal>

      <ConfirmDialog
        open={delIdx !== null}
        title="Delete Activity"
        message="Are you sure you want to delete this activity?"
        onConfirm={deleteItem}
        onCancel={() => setDelIdx(null)}
      />
    </SectionCard>
  );
}

/* ─────── Facts ─────── */

function FactsSection({ data, update }: any) {
  const items: Fact[] = data.facts;
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Fact>({ icon: "", value: "", label: "" });
  const [delIdx, setDelIdx] = useState<number | null>(null);

  const openAdd = () => { setForm({ icon: "", value: "", label: "" }); setEditIdx(-1); };
  const openEdit = (i: number) => { setForm({ ...items[i] }); setEditIdx(i); };
  const saveItem = () => {
    const u = [...items];
    if (editIdx === -1) u.push(form);
    else if (editIdx !== null) u[editIdx] = form;
    update("facts", u);
    setEditIdx(null);
    showToast("success", editIdx === -1 ? "Fact added" : "Fact updated");
  };
  const deleteItem = () => {
    if (delIdx === null) return;
    update("facts", items.filter((_, j) => j !== delIdx));
    setDelIdx(null);
    showToast("success", "Fact deleted");
  };

  return (
    <SectionCard title="Facts" icon={Award} onAdd={openAdd}>
      <div className="space-y-2">
        {items.map((f, i) => (
          <ItemRow key={i} label={`${f.label}: ${f.value}`} onEdit={() => openEdit(i)} onDelete={() => setDelIdx(i)} />
        ))}
      </div>

      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title={editIdx === -1 ? "Add Fact" : "Edit Fact"}>
        <div className="space-y-4">
          {(["icon", "value", "label"] as const).map((key) => (
            <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
              <input type="text" value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="input" />
            </Field>
          ))}
          <SaveBtn onClick={saveItem} />
        </div>
      </Modal>

      <ConfirmDialog
        open={delIdx !== null}
        title="Delete Fact"
        message="Are you sure you want to delete this fact?"
        onConfirm={deleteItem}
        onCancel={() => setDelIdx(null)}
      />
    </SectionCard>
  );
}

/* ─────── Skills ─────── */

function SkillsSection({ data, update }: any) {
  const items: Skill[] = data.skills;
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Skill>({ name: "", level: 0, category: "", icon: undefined });
  const [delIdx, setDelIdx] = useState<number | null>(null);

  const openAdd = () => { setForm({ name: "", level: 0, category: "", icon: undefined }); setEditIdx(-1); };
  const openEdit = (i: number) => { setForm({ ...items[i] }); setEditIdx(i); };
  const saveItem = () => {
    const u = [...items];
    if (editIdx === -1) u.push(form);
    else if (editIdx !== null) u[editIdx] = form;
    update("skills", u);
    setEditIdx(null);
    showToast("success", editIdx === -1 ? "Skill added" : "Skill updated");
  };
  const deleteItem = () => {
    if (delIdx === null) return;
    update("skills", items.filter((_, j) => j !== delIdx));
    setDelIdx(null);
    showToast("success", "Skill deleted");
  };

  return (
    <SectionCard title="Skills" icon={Wrench} onAdd={openAdd}>
      <div className="space-y-2">
        {items.map((s, i) => (
          <ItemRow key={i} label={`${s.name} (${s.category})`} onEdit={() => openEdit(i)} onDelete={() => setDelIdx(i)} />
        ))}
      </div>

      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title={editIdx === -1 ? "Add Skill" : "Edit Skill"}>
        <div className="space-y-4">
          <Field label="Name">
            <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="input" />
          </Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="input">
              <option value="">Select category</option>
              {SKILL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </Field>
          <Field label="Icon">
            <select value={form.icon || ""} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value || undefined }))} className="input">
              <option value="">Auto icon</option>
              {iconList.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </Field>
          <SaveBtn onClick={saveItem} />
        </div>
      </Modal>

      <ConfirmDialog
        open={delIdx !== null}
        title="Delete Skill"
        message="Are you sure you want to delete this skill?"
        onConfirm={deleteItem}
        onCancel={() => setDelIdx(null)}
      />
    </SectionCard>
  );
}

/* ─────── Resume ─────── */

function ResumeSection({ data, update }: any) {
  const resume = data.resume;
  const setResume = (v: any) => update("resume", v);

  const [editTarget, setEditTarget] = useState<{ section: string; idx: number } | null>(null);
  const [editType, setEditType] = useState<"title" | "item" | "desc">("item");
  const [form, setForm] = useState<any>(null);
  const [delTarget, setDelTarget] = useState<{ section: string; idx: number } | null>(null);

  const openEditTitle = (section: string) => {
    setEditType("title");
    setEditTarget({ section, idx: 0 });
    setForm({ value: (resume as any)[section].title });
  };
  const openEditItem = (section: string, idx: number) => {
    setEditType("item");
    setEditTarget({ section, idx });
    setForm({ ...(resume as any)[section].items[idx] });
  };
  const saveEdit = () => {
    if (!editTarget) return;
    const { section, idx } = editTarget;
    const sec = { ...(resume as any)[section] };
    if (editType === "title") sec.title = form.value;
    else sec.items[idx] = form;
    setResume({ ...resume, [section]: sec });
    setEditTarget(null);
    showToast("success", "Saved");
  };
  const deleteItem = () => {
    if (!delTarget) return;
    const { section, idx } = delTarget;
    const sec = { ...(resume as any)[section] };
    sec.items = sec.items.filter((_: any, j: number) => j !== idx);
    setResume({ ...resume, [section]: sec });
    setDelTarget(null);
    showToast("success", "Deleted");
  };
  const addItem = (section: string) => {
    const sec = { ...(resume as any)[section] };
    sec.items = [...sec.items, { period: "", institution: "", description: [""] }];
    setResume({ ...resume, [section]: sec });
    showToast("success", "Item added");
  };

  const sectionList = [
    { key: "education", label: "Education" },
    { key: "experience", label: "Experience" },
  ];

  return (
    <SectionCard title="Resume" icon={FileText}>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--heading)" }}>Summary</h4>
          <ItemRow label={resume.summary.title} onEdit={() => openEditTitle("summary")} />
          {resume.summary.items.map((item: string, i: number) => (
            <ItemRow key={i} label={item} onDelete={() => setDelTarget({ section: "summary", idx: i })} />
          ))}
          <AddBtn label="Add Summary Item" onClick={() => {
            const sec = { ...resume.summary };
            sec.items = [...sec.items, ""];
            setResume({ ...resume, summary: sec });
            showToast("success", "Item added");
          }} />
        </div>

        {sectionList.map(({ key, label }) => {
          const sec = resume[key];
          return (
            <div key={key}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{label}</h4>
                <button onClick={() => openEditTitle(key)} className="text-indigo-500 text-xs hover:underline">Edit title</button>
              </div>
              <ItemRow label={sec.title} />
              {sec.items.map((item: any, i: number) => (
                <ItemRow key={i} label={`${item.institution || "Untitled"} (${item.period})`} onEdit={() => openEditItem(key, i)} onDelete={() => setDelTarget({ section: key, idx: i })} />
              ))}
              <AddBtn label={`Add ${label} Item`} onClick={() => addItem(key)} />
            </div>
          );
        })}
      </div>

      <Modal open={editTarget !== null} onClose={() => setEditTarget(null)} title="Edit">
        <div className="space-y-4">
          {editType === "title" ? (
            <Field label="Title">
              <input type="text" value={form?.value || ""} onChange={(e) => setForm((f: any) => ({ ...f, value: e.target.value }))} className="input" />
            </Field>
          ) : (
            <>
              <Field label="Period">
                <input type="text" value={form?.period || ""} onChange={(e) => setForm((f: any) => ({ ...f, period: e.target.value }))} className="input" />
              </Field>
              <Field label="Institution">
                <input type="text" value={form?.institution || ""} onChange={(e) => setForm((f: any) => ({ ...f, institution: e.target.value }))} className="input" />
              </Field>
              <Field label="Description (comma separated)">
                <input type="text" value={(form?.description || []).join(", ")} onChange={(e) => setForm((f: any) => ({ ...f, description: e.target.value.split(", ").filter(Boolean) }))} className="input" />
              </Field>
            </>
          )}
          <SaveBtn onClick={saveEdit} />
        </div>
      </Modal>

      <ConfirmDialog
        open={delTarget !== null}
        title="Delete Item"
        message="Are you sure you want to delete this item?"
        onConfirm={deleteItem}
        onCancel={() => setDelTarget(null)}
      />
    </SectionCard>
  );
}

/* ─────── Projects ─────── */

function ProjectsSection({ data, update }: any) {
  const items: Project[] = data.projects;
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState<Project>({ id: "", title: "", description: "", image: "", category: "web", demoUrl: "", githubUrl: "", icon: "Code" });
  const [delIdx, setDelIdx] = useState<number | null>(null);

  const openAdd = () => { setForm({ id: `p-${Date.now()}`, title: "", description: "", image: "", category: "web", demoUrl: "", githubUrl: "", icon: "Code" }); setEditIdx(-1); };
  const openEdit = (i: number) => { setForm({ ...items[i] }); setEditIdx(i); };
  const saveItem = () => {
    const u = [...items];
    if (editIdx === -1) u.push(form);
    else if (editIdx !== null) u[editIdx] = form;
    update("projects", u);
    setEditIdx(null);
    showToast("success", editIdx === -1 ? "Project added" : "Project updated");
  };
  const deleteItem = () => {
    if (delIdx === null) return;
    update("projects", items.filter((_, j) => j !== delIdx));
    setDelIdx(null);
    showToast("success", "Project deleted");
  };

  return (
    <SectionCard title="Projects" icon={Folder} onAdd={openAdd}>
      <div className="space-y-2">
        {items.map((p, i) => (
          <ItemRow key={p.id} label={p.title || "Untitled"} onEdit={() => openEdit(i)} onDelete={() => setDelIdx(i)} />
        ))}
      </div>

      <Modal open={editIdx !== null} onClose={() => setEditIdx(null)} title={editIdx === -1 ? "Add Project" : "Edit Project"}>
        <div className="space-y-4">
          <Field label="Icon">
            <select value={form.icon || ""} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value || undefined }))} className="input">
              <option value="">No icon</option>
              {projectIconList.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </Field>
          {["title", "description", "category", "demoUrl", "githubUrl"].map((field) => (
            <Field key={field} label={field.charAt(0).toUpperCase() + field.slice(1)}>
              <input type="text" value={(form as any)[field]} onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))} className="input" />
            </Field>
          ))}
          <SaveBtn onClick={saveItem} />
        </div>
      </Modal>

      <ConfirmDialog
        open={delIdx !== null}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
        onConfirm={deleteItem}
        onCancel={() => setDelIdx(null)}
      />
    </SectionCard>
  );
}

/* ─────── Contact ─────── */

function ContactSection({ data, update }: any) {
  const c = data.contact;
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...c });

  const handleSave = () => {
    update("contact", form);
    setOpen(false);
    showToast("success", "Contact info saved");
  };

  return (
    <SectionCard title="Contact Info" icon={Mail} onEdit={() => { setForm({ ...c }); setOpen(true); }}>
      <div className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
        <p><strong style={{ color: "var(--heading)" }}>Email:</strong> {c.email}</p>
        <p><strong style={{ color: "var(--heading)" }}>Phone:</strong> {c.phone}</p>
        <p><strong style={{ color: "var(--heading)" }}>Location:</strong> {c.location}</p>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit Contact Info">
        <div className="space-y-4">
          {["email", "phone", "location"].map((key) => (
            <Field key={key} label={key.charAt(0).toUpperCase() + key.slice(1)}>
              <input type="text" value={(form as any)[key]} onChange={(e) => setForm((f: any) => ({ ...f, [key]: e.target.value }))} className="input" />
            </Field>
          ))}
          <SaveBtn onClick={handleSave} />
        </div>
      </Modal>
    </SectionCard>
  );
}

/* ─────── Shared UI ─────── */

function SectionCard({ title, icon: Icon, children, onEdit, onAdd }: { title: string; icon: React.ElementType; children: React.ReactNode; onEdit?: () => void; onAdd?: () => void }) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2.5">
          <Icon size={16} className="text-indigo-500" />
          <h2 className="font-bold text-sm" style={{ color: "var(--heading)" }}>{title}</h2>
        </div>
        <div className="flex gap-1">
          {onAdd && (
            <button onClick={onAdd} className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors" title="Add">
              <Plus size={16} />
            </button>
          )}
          {onEdit && (
            <button onClick={onEdit} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Edit">
              <Edit3 size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function ItemRow({ label, onEdit, onDelete }: { label: string; onEdit?: () => void; onDelete?: () => void }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: "var(--background)" }}>
      <span className="text-sm truncate" style={{ color: "var(--foreground)" }}>{label}</span>
      <div className="flex gap-1 flex-shrink-0 ml-2">
        {onEdit && (
          <button onClick={onEdit} className="p-1 rounded text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Edit3 size={14} />
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <Trash2 size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: "var(--heading)" }}>{label}</label>
      {children}
    </div>
  );
}

function SaveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
    >
      Save
    </button>
  );
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-indigo-500 hover:text-indigo-600 text-sm font-medium transition-colors mt-2"
    >
      <Plus size={14} />
      {label}
    </button>
  );
}
