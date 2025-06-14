import type { Metadata } from 'next';
import 'tailwindcss/tailwind.css';
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
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]`}>
        <Header />
        <main className="relative flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
