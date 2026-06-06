"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Send, Sparkles, MessageCircle } from "lucide-react";

interface ContactProps {
  email: string;
  phone: string;
  location: string;
}

export default function Contact({ email, phone, location }: ContactProps) {
  const [form, setForm] = useState({ name: "", message: "" });
  const [sent, setSent] = useState(false);

  const cleanPhone = phone.replace(/[^0-9]/g, "").replace(/^0+/, "");
  const waNumber = "2" + cleanPhone;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const waText = `👋 Hello, I'm ${form.name}.\n\n${form.message}`;
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank");
    setSent(true);
    setForm({ name: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 relative" style={{ background: "var(--surface)" }}>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[120px]" />

      <div className="section-container">
        <div className="section-header">
          <h2>
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="section-divider" />
          <p>Have a project in mind? Let&apos;s build something great together</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: MapPin, label: "Location", value: location, color: "from-indigo-500/10 to-purple-500/10", iconColor: "text-indigo-400" },
              { icon: Mail, label: "Email", value: email, color: "from-purple-500/10 to-pink-500/10", iconColor: "text-purple-400" },
              { icon: MessageCircle, label: "WhatsApp", value: phone, color: "from-green-500/10 to-emerald-500/10", iconColor: "text-green-400" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-xl card-hover"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={20} className={item.iconColor} />
                </div>
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8 rounded-2xl relative overflow-hidden"
              style={{ background: "var(--card)", border: "1px solid var(--border)" }}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 rounded-full blur-[60px]" />

              <div className="relative space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle size={20} className="text-green-400" />
                  <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
                    Messages will be sent via WhatsApp
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--heading)" }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/50"
                    style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--heading)" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/50 resize-none"
                    style={{ background: "var(--background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  {sent ? (
                    <><Sparkles size={16} /> Sent via WhatsApp!</>
                  ) : (
                    <><Send size={16} /> Send via WhatsApp</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
