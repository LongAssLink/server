import { SiteFooter } from '@/components/molecules/site-footer';
import { SiteHeader } from '@/components/molecules/site-header';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <ThemeProvider attribute='class'>
      <SiteHeader />
      <main className='container'>
        <Outlet />
        <Toaster />
      </main>
      <SiteFooter />
    </ThemeProvider>
  );
}
