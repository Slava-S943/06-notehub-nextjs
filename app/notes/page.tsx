import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function NotesPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search],
    queryFn: () => fetchNotes(page, search),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
