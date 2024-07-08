'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2Icon, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';

const ContactSchema = z.object({
  name: z.string().min(2, {
    message: 'This field must not be empty'
  }),
  email: z.string().min(2),
  message: z.string().min(1)
});

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting }
  } = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema)
  });

  const [isValidReCAPTCHA, setIsValidReCAPTCHA] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const contactSubmit = async (formData: z.infer<typeof ContactSchema>) => {
    if (isValidReCAPTCHA) {
      try {
        const response = await fetch('/api/email', {
          method: 'POST',
          body: JSON.stringify(formData)
        });

        if (response.status === 200) {
          const data = await response.json();
          recaptchaRef.current?.reset();
          console.info(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(contactSubmit)}>
      {isSubmitSuccessful && isValidReCAPTCHA && (
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
          id="name"
          autoComplete="name"
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
          id="email"
          autoComplete="email"
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
          id="message"
          {...register('message')}
        />
        {errors?.message && (
          <p className="text-sm font-medium text-destructive">
            {errors?.message?.message}
          </p>
        )}
      </div>

      <ReCAPTCHA
        // ref={recaptchaRef}
        size="normal"
        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
        className="mb-4"
        onChange={(value) => {
          setIsValidReCAPTCHA(Boolean(value));
        }}
      />

      <Button disabled={!isValidReCAPTCHA || isSubmitting} type="submit">
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
  );
}
