'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import css from './NoteList.module.css';
import { deleteNote } from '@/lib/api';
import type { Note } from '@/types/note';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['notes'],
      });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>

          <p className={css.content}>{note.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>

            <button
              className={css.button}
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate(note.id)}
            >
              {deleteMutation.isPending ? 'Delete...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
