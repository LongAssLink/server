import { useState } from 'react';

import { toast } from '@/components/ui/use-toast';

import ShortenForm, { ShortenFormProps } from './ShortenForm';
import ShortenResult from './ShortenResult';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [link] = useState<string>();

  function onSubmit(data: Parameters<ShortenFormProps['onSubmit']>[0]) {
    setLoading(true);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
  }

  return (
    <>
      <section className='pt-11 pb-5'>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
          Got a long ass link?
        </h1>
        <p className='leading-7 [&:not(:first-child)]:mt-6 text-lg'>
          We&apos;ve got the remedy. Shorten it with LongAssLink and keep it
          snappier than a one-liner!
        </p>
      </section>
      <section className='flex flex-col items-start py-4 gap-2'>
        <ShortenForm onSubmit={onSubmit} />
        <ShortenResult loading={loading} link={link} />
      </section>
    </>
  );
}
