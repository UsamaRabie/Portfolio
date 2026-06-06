"use client";

import { useRef } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your-cloud-name";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your-upload-preset";

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploading = useRef(false);

  const uploadToCloudinary = async (file: File) => {
    if (uploading.current) return;
    uploading.current = true;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      uploading.current = false;
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadToCloudinary(file);
    e.target.value = "";
  };

  return (
    <div>
      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--heading)" }}>
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload..."
          className="flex-1 px-3 py-2 rounded-lg border text-sm outline-none transition-all focus:ring-2 focus:ring-indigo-500/50"
          style={{ background: "var(--background)", borderColor: "var(--border)", color: "var(--foreground)" }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-medium hover:shadow-lg transition-all duration-300"
        >
          <Upload size={14} />
          Upload
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      {value && (
        <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border" style={{ borderColor: "var(--border)" }}>
          <img
            src={value}
            alt="preview"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </div>
      )}
    </div>
  );
}
