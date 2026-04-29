'use client';

import Script from 'next/script';

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function TurnstileWidget() {
  if (!siteKey) {
    console.error('Missing environment variable: NEXT_PUBLIC_TURNSTILE_SITE_KEY')
    return null;
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
      />
      <div
        className="cf-turnstile mb-4"
        data-sitekey={siteKey}
      />
    </>
  );
}
