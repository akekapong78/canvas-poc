import type { Metadata } from 'next';
import { IBM_Plex_Sans_Thai } from 'next/font/google';
import { Provider } from '@/components/ui/provider';
import './globals.css';

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['400', '500', '600', '700'],
  subsets: ['thai', 'latin'],
  display: 'swap',
  variable: '--font-ibm-plex-sans-thai',
});

export const metadata: Metadata = {
  title: 'Carbon Form — Lifecycle Builder',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={ibmPlexSansThai.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
