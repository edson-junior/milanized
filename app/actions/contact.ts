'use server';

import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Please enter a valid email address'),
  message: z.string().min(1, 'Message must not be empty')
});

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!token) return false;

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token
      })
    }
  );

  const data = await response.json();
  return data.success === true;
}

export async function sendContactEmail(formData: FormData) {
  const token = formData.get('cf-turnstile-response') as string | null;

  const result = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  });

  if (!result.success) {
    redirect('/contact?error=validation');
  }

  const { name, email, message } = result.data;

  const isHuman = await verifyTurnstile(token ?? '');
  if (!isHuman) {
    redirect('/contact?error=captcha');
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  await transport.sendMail({
    from: process.env.NODEMAILER_EMAIL,
    to: process.env.NODEMAILER_EMAIL,
    subject: `Message from ${name} (${email})`,
    text: message
  });

  redirect('/contact?success=1');
}
