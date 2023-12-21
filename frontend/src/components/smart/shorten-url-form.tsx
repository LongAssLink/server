import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import BigCard from '@/components/molecules/big-card';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

const FormSchema = z.object({
  link: z
    .string()
    .regex(
      /^(https?:\/\/)?[a-z0-9-]+(\.[a-z]{2,10})+\/[a-z0-9]/i,
      `We'll need a valid URL, like "longasslink.com/shorten-it"`
    )
});

type OnSubmitHandler = (
  data: z.infer<typeof FormSchema>
) => void | Promise<void>;

export interface ShortenFormProps {
  onSubmit: OnSubmitHandler;
}

export default function ShortenForm({ onSubmit }: ShortenFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      link: ''
    }
  });

  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (busy) {
      timer = setTimeout(() => setBusy(false), 2000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [busy]);

  return (
    <BigCard
      classNames={{ root: 'text-center', description: 'sr-only' }}
      title='Shorten & Sweeten'
      description='Create bite-sized links and QR codes. Share the joy!'
    >
      <Form {...form}>
        <form
          action='#'
          className='flex flex-col items-center gap-4'
          onSubmit={form.handleSubmit(onSubmit)}
          onSubmitCapture={() => setBusy(true)}
        >
          <FormField
            control={form.control}
            name='link'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Any long ass link, like https://www.youtube.com/watch?v=dQw4w9WgXcQ...'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  👆 This is the link you want to shorten
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            disabled={
              form.formState.isSubmitting || !form.formState.isValid || busy
            }
          >
            🦄 Shorten
          </Button>
        </form>
      </Form>
    </BigCard>
  );
}
