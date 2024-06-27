'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2Icon, Loader2 } from 'lucide-react';

const ContactSchema = z.object({
  name: z.string().min(2, {
    message: 'This field must not be empty'
  }),
  email: z.string().min(2),
  message: z.string().min(1)
});

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema)
  });

  const contactSubmit = async (formData: z.infer<typeof ContactSchema>) => {
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (response.status === 200) {
        const data = await response.json();
        console.info(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Heading as="h1" className="text-2xl lg:text-5xl">
        Get in touch
      </Heading>
      <p className="leading-7 mb-8">{`We'll reply as soon as possible`}</p>
      <form onSubmit={handleSubmit(contactSubmit)}>
        {isSubmitSuccessful && (
          <div className="success flex gap-2 group py-4 px-4 mb-4 font-semibold rounded border-green-500 border-2 bg-green-300 text-green-800">
            <CheckCircle2Icon />
            {`Your message has been sent! We'll be in touch ASAP!`}
          </div>
        )}
        <div className="grid gap-4 mb-5">
          <Label htmlFor="name">
            Name <span className="text-red-500 font-bold">*</span>
          </Label>
          <Input
            className="w-full text-base font-medium"
            type="text"
            placeholder="John Doe"
            {...register('name')}
          />
          {errors?.name && (
            <p className="text-sm font-medium text-destructive">
              {errors?.name?.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 mb-5">
          <Label htmlFor="email">
            Email <span className="text-red-500 font-bold">*</span>
          </Label>
          <Input
            className="w-full text-base font-medium"
            type="email"
            placeholder="example@domain.com"
            {...register('email')}
          />
          {errors?.email && (
            <p className="text-sm font-medium text-destructive">
              {errors?.email?.message}
            </p>
          )}
        </div>

        <div className="grid gap-4 mb-5">
          <Label htmlFor="message">
            Your message <span className="text-red-500 font-bold">*</span>
          </Label>
          <Textarea
            rows={4}
            placeholder="Type your message here."
            className="w-full text-base font-medium"
            {...register('message')}
          />
          {errors?.message && (
            <p className="text-sm font-medium text-destructive">
              {errors?.message?.message}
            </p>
          )}
        </div>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>{`Submit`}</>
          )}
        </Button>
      </form>
    </>
  );
}
