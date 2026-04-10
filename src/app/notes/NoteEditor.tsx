"use client";

import { useState } from "react";
import { Save, X } from "lucide-react";

interface NoteEditorProps {
  note?: {
    id: string;
    title: string;
    content: string;
    lessonId?: string;
  };
  onSave: (data: { title: string; content: string; lessonId?: string }) => Promise<void>;
  onCancel: () => void;
  isNew?: boolean;
}

export function NoteEditor({ note, onSave, onCancel, isNew = false }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [lessonId, setLessonId] = useState(note?.lessonId || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSaving(true);
    try {
      await onSave({ title, content, lessonId: lessonId || undefined });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4">
        {isNew ? "Create New Note" : "Edit Note"}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Note title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[150px]"
            placeholder="Write your notes here..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/70 mb-1">
            Lesson ID (Optional)
          </label>
          <input
            type="text"
            value={lessonId}
            onChange={(e) => setLessonId(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Link to a specific lesson (optional)"
          />
          <p className="text-xs text-white/50 mt-1">
            Enter a lesson ID to link this note to a specific lesson
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving || !title.trim() || !content.trim()}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={16} />
            {isSaving ? "Saving..." : isNew ? "Create Note" : "Save Changes"}
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}