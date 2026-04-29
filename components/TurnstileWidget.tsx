'use client';

import Script from 'next/script';

export default function TurnstileWidget() {
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
      />
      <div
        className="cf-turnstile mb-4"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
      />
    </>
  );
}
