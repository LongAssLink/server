import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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

  return (
    <Card className='max-w-2xl w-full'>
      <CardHeader>
        <CardTitle className='text-xl'>Shorten & Sweeten</CardTitle>
        <CardDescription className='text-gray-900 text-lg'>
          Create bite-sized links and QR codes. Share the joy!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            action='#'
            className='flex flex-col items-start gap-4'
            onSubmit={form.handleSubmit(onSubmit)}
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
                    This the link you want to shorten
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={form.formState.isSubmitting}>
              Shorten!
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
