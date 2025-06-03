import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/header/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Ecommerce',
  description: 'Ecommerce de productos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased bg-[hsl(var(--background))]`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
