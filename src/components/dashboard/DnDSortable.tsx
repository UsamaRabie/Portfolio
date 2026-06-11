"use client";

import { useState, useCallback, useRef } from "react";
import { GripVertical, Edit3, Trash2 } from "lucide-react";

interface SortableListProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  getKey: (item: T, index: number) => string;
  getLabel: (item: T) => string;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export default function SortableList<T>({
  items,
  onChange,
  getKey,
  getLabel,
  onEdit,
  onDelete,
}: SortableListProps<T>) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);
  const dragNode = useRef<HTMLElement | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, idx: number) => {
      dragNode.current = e.target as HTMLElement;
      setDragIdx(idx);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(idx));
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, idx: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      if (idx !== overIdx) setOverIdx(idx);
    },
    [overIdx]
  );

  const handleDragEnd = useCallback(() => {
    if (dragIdx === null || overIdx === null || dragIdx === overIdx) {
      setDragIdx(null);
      setOverIdx(null);
      return;
    }
    const updated = [...items];
    const [moved] = updated.splice(dragIdx, 1);
    updated.splice(overIdx, 0, moved);
    onChange(updated);
    setDragIdx(null);
    setOverIdx(null);
  }, [dragIdx, overIdx, items, onChange]);

  return (
    <div className="space-y-1">
      {items.map((item, idx) => (
        <div
          key={getKey(item, idx)}
          draggable
          onDragStart={(e) => handleDragStart(e, idx)}
          onDragOver={(e) => handleDragOver(e, idx)}
          onDragEnd={handleDragEnd}
          className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 cursor-default ${
            dragIdx === idx ? "opacity-30 scale-95" : ""
          } ${
            overIdx === idx && dragIdx !== idx
              ? "border-t-2 border-indigo-500"
              : ""
          }`}
          style={{
            background: "var(--background)",
            borderTopColor:
              overIdx === idx && dragIdx !== idx ? undefined : "transparent",
            borderTopWidth: overIdx === idx && dragIdx !== idx ? 2 : 1,
            borderBottomWidth: 1,
            borderBottomColor: "var(--border)",
          }}
        >
          <span
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0"
            onMouseDown={(e) => {
              (e.target as HTMLElement).closest("[draggable]")?.setAttribute("draggable", "true");
            }}
          >
            <GripVertical size={14} />
          </span>
          <span className="text-sm truncate flex-1" style={{ color: "var(--foreground)" }}>
            {getLabel(item)}
          </span>
          {onEdit && (
            <button
              onClick={() => onEdit(idx)}
              className="p-1 rounded text-gray-400 hover:text-indigo-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
            >
              <Edit3 size={14} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(idx)}
              className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex-shrink-0"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
