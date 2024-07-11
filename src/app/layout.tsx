'use client';
import { Inter } from 'next/font/google';
import '@/assets/css/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import ThemeProvider from './components/theme-provider';
import { Header } from './components/header';
import { SideBar } from './components/side-bar';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

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
          <ContextMenu>
            <ContextMenuTrigger>
              <ThemeProvider>
                <div className="flex h-full w-full">
                  <SideBar />
                  <div className="w-full">
                    <Header />
                    <ContextMenuContent>
                      <ContextMenuItem>What do you wanna do?</ContextMenuItem>
                    </ContextMenuContent>
                    <div className="h-calc-100-minus-80 overflow-hidden">{children}</div>
                  </div>
                </div>
                <Toaster duration={3000} />
              </ThemeProvider>
            </ContextMenuTrigger>
          </ContextMenu>
        </body>
      </html>
    </QueryClientProvider>
  );
}

