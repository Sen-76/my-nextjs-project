'use client';
import { Inter } from 'next/font/google';
import '@/assets/css/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import ThemeProvider from './components/theme-provider';
import { Header } from './components/header';
import { SideBar } from './components/side-bar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider>
            <div className="flex h-full">
              <SideBar />
              <div>
                <Header />
                {children}
              </div>
            </div>
            <Toaster duration={3000} />
          </ThemeProvider>
        </body>
      </html>
    </QueryClientProvider>
  );
}

