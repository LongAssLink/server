import { useAtom } from 'jotai';
import { useState } from 'react';

import ShortenForm, {
  ShortenFormProps
} from '@/components/smart/shorten-url-form';
import ShortenResult from '@/components/smart/shorten-url-result';
import { toast } from '@/components/ui/use-toast';

import api, { type ApiResponses } from '@/lib/api';
import { linkAtom } from '@/lib/state/link';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [linkRes, setLinkRes] = useAtom(linkAtom);

  async function onSubmit(data: Parameters<ShortenFormProps['onSubmit']>[0]) {
    setLoading(true);

    try {
      const res = await api
        .post('api/link', {
          json: {
            dest: data.link,
            slug: ''
          }
        })
        .json<ApiResponses<'api/link'>>();
      setLinkRes(res);
    } catch (error) {
      toast({
        title: 'Oops! Something went wrong...',
        description: (
          <p className='mt-2 w-[340px] rounded-md bg-background p-4'>
            Please try again later!
          </p>
        )
      });
      setLinkRes(null);
    }

    setLoading(false);
  }

  return (
    <>
      <section className='pb-5 text-center pt-11'>
        <h1 className='text-4xl font-extrabold leading-relaxed tracking-tight scroll-m-20 lg:text-5xl lg:leading-loose first-of-type:mt-10'>
          Got a long ass link?
        </h1>
        <p className='text-lg'>
          We&apos;ve got the remedy. Shorten it with LongAssLink and keep it
          snappier than a one-liner!
        </p>
      </section>
      <section className='flex flex-col items-center gap-2 py-4'>
        <ShortenForm onSubmit={onSubmit} />
        <ShortenResult loading={loading} slug={linkRes?.data?.slug} />
      </section>
    </>
  );
}
