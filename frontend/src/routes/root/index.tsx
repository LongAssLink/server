import { Provider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { Outlet } from 'react-router-dom';

import { SiteFooter } from '@/components/molecules/site-footer';
import { SiteHeader } from '@/components/molecules/site-header';
import { Toaster } from '@/components/ui/toaster';

interface RootPageProps {
  children?: React.ReactNode;
}

export default function Root({ children }: RootPageProps) {
  return (
    <ThemeProvider attribute='class'>
      <Provider>
        <SiteHeader />
        <main>
          <section className='container'>
            <Outlet />
            {children}
          </section>
          <Toaster />
        </main>
        <SiteFooter />
      </Provider>
    </ThemeProvider>
  );
}
