'use server';

import { redirect } from 'next/navigation';
import nodemailer from 'nodemailer';
import { ContactSchema } from '@/lib/contact-schema';

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!token) return false;

  try {
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

    if (!response.ok) return false;

    const data = await response.json();
    return data.success === true;
  } catch (err) {
    console.error('[verifyTurnstile] Verification request failed:', err);
    return false;
  }
}

export async function sendContactEmail(formData: FormData) {
  const token = formData.get('cf-turnstile-response') as string | null;

  const result = ContactSchema.safeParse({
    name: (formData.get('name') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    message: (formData.get('message') as string) ?? ''
  });

  if (!result.success) {
    redirect('/contact?error=validation');
  }

  const { name, email, message } = result.data;

  const isHuman = await verifyTurnstile(token ?? '');
  if (!isHuman) {
    redirect('/contact?error=captcha');
  }

  const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL;
  const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD;

  if (!NODEMAILER_EMAIL || !NODEMAILER_PASSWORD) {
    throw new Error(
      'Missing required environment variables: NODEMAILER_EMAIL and NODEMAILER_PASSWORD must be set.'
    );
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: NODEMAILER_EMAIL,
      pass: NODEMAILER_PASSWORD
    }
  });

  try {
    await transport.sendMail({
      from: NODEMAILER_EMAIL,
      to: NODEMAILER_EMAIL,
      subject: `Message from ${name} (${email})`,
      text: message
    });
  } catch (err) {
    console.error('[sendContactEmail] Failed to send email:', err);
    redirect('/contact?error=send');
  }

  redirect('/contact?success=1');
}
