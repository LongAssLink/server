import api, { ApiResponses } from '@/lib/api';
import { useEffect } from 'react';
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug;
  try {
    const response = await api
      .get(`api/link/${slug}`)
      .json<ApiResponses<'api/link'>>();
    return response;
  } catch (error) {
    return null;
  }
}

export default function ShortLinkPage() {
  const linkData = useLoaderData() as ApiResponses<'api/link'> | null;

  useEffect(() => {
    let dest = '/';
    if (linkData) {
      dest = linkData.data?.dest ?? dest;
      if (dest.length > 2 && !dest.startsWith('http')) {
        dest = 'http://' + dest;
      }
    }
    const timer = setTimeout(() => {
      window.open(dest, '_self');

      clearTimeout(timer);
    }, 500);

    return () => clearTimeout(timer);
  });

  if (!linkData) {
    return (
      <div className='flex flex-col min-h-[60vh] items-center justify-center gap-5'>
        <h1 className='text-xl'>Hmm, that Link doesn&apos;t seem to exist!</h1>
        <p>
          Redirecting you to the <Link to='/'>home page</Link>...
        </p>
      </div>
    );
  }

  return (
    <div className='flex flex-col min-h-[60vh] items-center justify-center gap-5'>
      <h1 className='text-xl'>Taking you to your destination...</h1>
    </div>
  );
}
