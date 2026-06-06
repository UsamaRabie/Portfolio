"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

export interface ToastMessage {
  id: number;
  type: "success" | "error";
  text: string;
}

let toastId = 0;
const listeners: Set<(msg: ToastMessage) => void> = new Set();

export function showToast(type: "success" | "error", text: string) {
  const msg: ToastMessage = { id: ++toastId, type, text };
  listeners.forEach((fn) => fn(msg));
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handler = (msg: ToastMessage) => {
      setToasts((prev) => [...prev, msg]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== msg.id));
      }, 3000);
    };
    listeners.add(handler);
    return () => { listeners.delete(handler); };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[999999] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium animate-slide-up"
          style={{
            background: t.type === "success" ? "#065f46" : "#991b1b",
            color: "white",
            minWidth: "200px",
          }}
        >
          {t.type === "success" ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {t.text}
          <button
            onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
            className="ml-auto p-0.5 hover:opacity-70"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
