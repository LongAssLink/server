import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

import BigCard from '@/components/molecules/big-card';
import { CopyButton } from '@/components/molecules/copy-button';
import { Progress } from '@/components/ui/progress';

import { SITE_BASE, SITE_BASE_SHORT } from '@/lib/utils';

import logo from '@/assets/logo-color.png';

interface ShortenResultProps {
  loading?: boolean;
  slug?: string;
}

function ShortenResult({ loading = false, slug }: ShortenResultProps) {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setInterval(() => setProgress(p => (p + 3) % 101), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Progress value={progress} className='w-full max-w-2xl my-10' />;
  }

  if (!slug) {
    return null;
  }

  return (
    <BigCard classNames={{ root: 'text-center' }} title='Short Link + QR'>
      <div className='flex flex-col items-center h-full'>
        <style>
          {`#qrcode image {mix-blend-mode: hard-light;opacity:50%;}`}
        </style>
        <QRCodeSVG
          id='qrcode'
          size={256}
          level='H'
          value={SITE_BASE + slug}
          imageSettings={{
            excavate: false,
            src: logo,
            height: 255,
            width: 255
          }}
        />
        <pre className='flex items-center gap-2 p-2 mt-2 text-sm border rounded'>
          <span role='presentation'></span>
          {SITE_BASE_SHORT + slug}
          <CopyButton value={SITE_BASE + slug} />
        </pre>
      </div>
    </BigCard>
  );
}

export default ShortenResult;
