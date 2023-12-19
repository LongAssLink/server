import { cn } from '@/lib/utils';
import { Link1Icon } from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import { processNavItems } from './processNavItems';
import { MainNavProps } from './types';

export function MainNav({ navItems = [] }: MainNavProps) {
  const { pathname } = useLocation();

  const navItemList = processNavItems(navItems, pathname);

  return (
    <div className='mr-4 hidden md:flex'>
      <Link to='/' className='mr-6 flex items-center space-x-2'>
        <Link1Icon className='h-6 w-6' />
        <span className='hidden font-bold sm:inline-block'>LongAssLink</span>
      </Link>
      <nav className='flex items-center space-x-6 text-sm font-medium'>
        {navItemList.map(item => (
          <Link
            key={item.id}
            to={item.link}
            className={cn(
              'transition-colors hover:text-foreground/80',
              item.active ? 'text-foreground' : 'text-foreground/60'
            )}
            aria-current={item.active ? 'page' : undefined}
            aria-label={item.caption}
            title={item.caption}
          >
            {item.caption}
          </Link>
        ))}
      </nav>
    </div>
  );
}
