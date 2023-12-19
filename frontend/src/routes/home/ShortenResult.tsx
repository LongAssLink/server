import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import logo from '@/assets/logo-color.png';

interface ShortenResultProps {
  loading?: boolean;
  link?: string;
}

function ShortenResult({ loading = false, link }: ShortenResultProps) {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setInterval(() => setProgress(p => p + 3), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Progress value={progress} className='max-w-2xl w-full my-10' />;
  }

  if (!link) {
    return null;
  }

  return (
    <Card className='text-center'>
      <CardHeader>
        <CardTitle>Short Link + QR</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col items-center h-full'>
          <style>
            {`#qrcode image {mix-blend-mode: hard-light;opacity:50%;}`}
          </style>
          <QRCodeSVG
            id='qrcode'
            size={256}
            level='H'
            value={link}
            imageSettings={{
              excavate: false,
              src: logo,
              height: 255,
              width: 255
            }}
          />
          <div className='min-h-[100px]'>{link}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShortenResult;
