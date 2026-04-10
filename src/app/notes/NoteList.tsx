"use client";

import { useState } from "react";
import { Edit, Trash2, BookOpen, Calendar, Search, Filter } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  lessonId?: string;
  lessonTitle?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => Promise<void>;
}

export function NoteList({ notes, onEdit, onDelete }: NoteListProps) {
  const [search, setSearch] = useState("");
  const [filterLesson, setFilterLesson] = useState("");

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(search.toLowerCase()) ||
                         note.content.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filterLesson || note.lessonId === filterLesson;
    return matchesSearch && matchesFilter;
  });

  const uniqueLessons = Array.from(new Set(notes.filter(n => n.lessonId).map(n => n.lessonId)));

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
          <select
            value={filterLesson}
            onChange={(e) => setFilterLesson(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg pl-10 pr-8 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
          >
            <option value="">All Lessons</option>
            {uniqueLessons.map(lessonId => (
              <option key={lessonId} value={lessonId}>
                Lesson: {lessonId?.slice(0, 8)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-sm text-white/70">Total Notes</p>
          <p className="text-2xl font-bold text-white">{notes.length}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-sm text-white/70">Linked to Lessons</p>
          <p className="text-2xl font-bold text-white">
            {notes.filter(n => n.lessonId).length}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
          <p className="text-sm text-white/70">Last Updated</p>
          <p className="text-lg font-bold text-white">
            {notes.length > 0 
              ? new Date(Math.max(...notes.map(n => new Date(n.updatedAt).getTime()))).toLocaleDateString()
              : "Never"
            }
          </p>
        </div>
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-white/30" size={48} />
          <p className="text-white/60 mt-4">
            {search || filterLesson ? "No notes match your search" : "No notes yet"}
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">{note.title}</h4>
                  <p className="text-white/70 mt-2 line-clamp-2">{note.content}</p>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-white/50">
                    {note.lessonId && (
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} />
                        <span>Lesson: {note.lessonTitle || note.lessonId.slice(0, 8)}...</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Updated: {new Date(note.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => onEdit(note)}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    title="Edit note"
                  >
                    <Edit size={16} className="text-white" />
                  </button>
                  <button
                    onClick={() => onDelete(note.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                    title="Delete note"
                  >
                    <Trash2 size={16} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}