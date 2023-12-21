import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BigCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;

  children?: React.ReactNode;

  classNames?: {
    root?: string;
    title?: string;
    description?: string;
    header?: string;
    content?: string;
  };
}

function BigCard({ title, description, children, classNames }: BigCardProps) {
  const withHeader = Boolean(title || description);
  return (
    <Card className={cn('w-full max-w-2xl', classNames?.root)}>
      {withHeader ? (
        <CardHeader className={classNames?.header}>
          {title ? (
            <CardTitle className={cn('text-xl', classNames?.title)}>
              {title}
            </CardTitle>
          ) : null}
          {description ? (
            <CardDescription className={classNames?.description}>
              {description}
            </CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent className={classNames?.content}>{children}</CardContent>
    </Card>
  );
}

export default BigCard;
