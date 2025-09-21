import axios from 'axios';
import type { Note, NoteTag } from '../types/note.ts';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async (page: number, search: string) => {
  const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

  const params: Record<string, string | number> = { page };

  if (search.trim()) {
    params.search = search.trim();
  }

  const res = await axios.get<FetchNotesResponse>("/notes", {
    params,
    headers: { Authorization: `Bearer ${myKey}` },
  });
  
  
  // const res = await axios.get<FetchNotesResponse>("/notes", {
  //   params: {
  //     page,
  //     search,
  //   },
  //   headers: { Authorization: `Bearer ${myKey}` },
  // });

  return res.data;
}

export const createNote = async (newNote: NewNote) => {
  const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

  const res = await axios.post<Note>("/notes", newNote, {
    headers: { Authorization: `Bearer ${myKey}` },
  });

  return res.data;
}


export const deleteNote = async (noteId: number) => {
  const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

  const res = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: { Authorization: `Bearer ${myKey}` },
  });

  return res.data;
}
