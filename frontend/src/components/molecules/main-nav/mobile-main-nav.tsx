import { HamburgerMenuIcon, Link1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { processNavItems } from './processNavItems';
import { MainNavProps } from './types';

export function MainNav({ navItems = [] }: MainNavProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const processedNavItems = processNavItems(navItems, pathname);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
        >
          <HamburgerMenuIcon className='w-5 h-5' />
          <strong className='mx-1'>LongAssLink</strong>
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <MobileLink to='/' className='flex items-center' onOpenChange={setOpen}>
          <Link1Icon className='w-4 h-4 mr-2' />
          <span className='font-bold'>LongAssLink</span>
        </MobileLink>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
          <div className='flex flex-col space-y-3'>
            {processedNavItems.map(it => (
              <MobileLink
                key={it.id}
                to={it.link}
                onOpenChange={setOpen}
                className={it.active ? '' : 'text-muted-foreground'}
              >
                {it.caption}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  to,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      to={to}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
