import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../root';

function ErrorPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.open('/', '_self');

      clearTimeout(timer);
    }, 1.5e3);

    return () => clearTimeout(timer);
  });

  return (
    <Layout>
      <div className='flex flex-col min-h-[60vh] items-center justify-center gap-5'>
        <h1 className='text-xl'>Hmm, that Link doesn&apos;t seem to exist!</h1>
        <p>
          Redirecting you to the <Link to='/'>home page</Link>...
        </p>
      </div>
    </Layout>
  );
}

export default ErrorPage;
