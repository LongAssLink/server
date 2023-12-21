export function SiteFooter() {
  return (
    <footer className='py-6 border-t md:py-0'>
      <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
        <p className='text-sm leading-loose text-center text-muted-foreground md:text-left'>
          Built by{' '}
          <a
            href='https://github.com/fa7ad'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'
          >
            fahad
          </a>
        </p>
      </div>
    </footer>
  );
}
