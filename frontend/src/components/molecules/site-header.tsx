import { cn } from '@/lib/utils';
import { GitHubLogoIcon, TwitterLogoIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { buttonVariants } from '../ui/button';
import * as MainNav from './main-nav';
import { ModeToggle } from './mode-toggle';

export const navBarMenuItems: MainNav.NavLinkItem[] = [
  {
    link: '/',
    caption: 'Shorten'
  }
];

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-14 items-center justify-between'>
        <MainNav.Desktop navItems={navBarMenuItems} />
        <MainNav.Mobile navItems={navBarMenuItems} />
        <div className='flex items-center justify-between space-x-2 md:justify-end'>
          <nav className='flex items-center'>
            <Link
              to='https://github.com/fa7ad'
              target='_blank'
              rel='noreferrer'
              className={cn(buttonVariants({ variant: 'ghost' }), 'w-9 px-0')}
            >
              <GitHubLogoIcon className='h-4 w-4' />
              <span className='sr-only'>GitHub</span>
            </Link>
            <Link
              to='https://bsky.app/profile/fa7ad.bsky.social'
              target='_blank'
              rel='noreferrer'
              className={cn(buttonVariants({ variant: 'ghost' }), 'w-9 px-0')}
            >
              <TwitterLogoIcon className='h-3 w-3 fill-current' />
              <span className='sr-only'>Twitter</span>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
