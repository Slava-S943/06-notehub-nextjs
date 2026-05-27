import type { Metadata } from 'next';

import 'modern-normalize/modern-normalize.css';
import './globals.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'NoteHub application',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />

          <main className="main">{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
