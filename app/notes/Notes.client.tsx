'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, search],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search,
      }),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Could not fetch notes.</p>;

  return (
    <div>
      <SearchBox value={search} onChange={handleSearch} />

      {data?.notes.map(note => (
        <div key={note.id} style={{ borderBottom: '1px solid #ddd', marginBottom: 12 }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}

      {data && data.totalPages > 1 && (
        <div style={{ marginTop: 20 }}>
          <Pagination page={page} totalPages={data.totalPages} setPage={setPage} />
        </div>
      )}
    </div>
  );
}
