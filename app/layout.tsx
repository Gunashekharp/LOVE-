import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Great_Vibes, Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-great-vibes' });

export const metadata: Metadata = {
  title: 'Timeline of Us',
  description: 'A cinematic love story experience.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body>{children}</body>
    </html>
  );
}
