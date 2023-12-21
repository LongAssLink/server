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
      <div className='container flex items-center justify-between h-14'>
        <MainNav.Desktop navItems={navBarMenuItems} />
        <MainNav.Mobile navItems={navBarMenuItems} />
        <ModeToggle />
      </div>
    </header>
  );
}
