'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';

import css from './NoteDetails.module.css';

interface Props {
  id: string;
}

export default function NoteDetailsClient({ id }: Props) {
  const { data, isLoading, isError, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError) {
    return <p>Something went wrong: {(error as Error).message}</p>;
  }

  if (!data) {
    return <p>Note not found</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>

        <p className={css.tag}>{data.tag}</p>

        <p className={css.content}>{data.content}</p>

        <p className={css.date}>{new Date(data.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
