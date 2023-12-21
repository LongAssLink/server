import { Provider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import { Outlet } from 'react-router-dom';

import { SiteFooter } from '@/components/molecules/site-footer';
import { SiteHeader } from '@/components/molecules/site-header';
import { Toaster } from '@/components/ui/toaster';

export default function Root() {
  return (
    <ThemeProvider attribute='class'>
      <Provider>
        <SiteHeader />
        <main>
          <section className='container'>
            <Outlet />
          </section>
          <Toaster />
        </main>
        <SiteFooter />
      </Provider>
    </ThemeProvider>
  );
}
