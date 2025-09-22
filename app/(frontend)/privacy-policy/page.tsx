import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlockRendererClient from '@/components/BlockRenderClient';
import Hero from '@/components/Hero';
import { getPrivacyPage } from '@/sanity/lib/client';

export async function generateMetadata() {
  const homepage = await getPrivacyPage();

  if (!homepage) {
    return notFound();
  }

  const metaData: Metadata = {
    title: homepage.metadata?.title,
    description: homepage.metadata?.description,
    robots:
      'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    alternates: {
      canonical: `${process.env.CLIENT_URL}/privacy-policy`,
      types: {
        'application/rss+xml': `${process.env.CLIENT_URL}/blog/rss.xml`
      }
    },
    openGraph: {
      url: `${process.env.CLIENT_URL}/privacy-policy`,
      title: homepage.metadata?.title,
      description: homepage.metadata?.description,
      type: 'website',
      images: {
        url: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        secureUrl: `${process.env.CLIENT_URL}/opengraph-logo.png`,
        alt: homepage.metadata?.title,
        width: 360,
        height: 360,
        type: 'image'
      }
    }
  };

  return metaData;
}

export default async function PrivacyPolicy() {
  const data = await getPrivacyPage();

  if (!data) {
    return notFound();
  }

  return (
    <>
      {data.title && (
        <Hero
          mainTitle={data.title}
          subtitle="Last Updated: 18/07/2024"
          bgImage="/images/nir-himi-Z1bmf6nNVkc-unsplash.jpg"
          placeholder="data:image/webp;base64,UklGRnAEAABXRUJQVlA4WAoAAAAgAAAAAwEAkQAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggggIAABAXAJ0BKgQBkgA+7W6uUT+9LiKnlNvj8B2JZ27gBay8f71Lt836dgaAJuqLO3/kviE/mEJ1Ade74f/UZ/s5lhMnQEJWUi7Os/+1y6BawEVF0xYrtmuE/S0GWrZs2bLeIUX+aZvkMxn6IVHZelmyWdXZVAIpN9G7HXwfd5Ficm1yU6sdjxRpGHp+F9EC1cCi59Vubz4UWLoFNm3PeQVdoFek1c4167UfGix0P2dqayPlZXs6WDIumdGO9QH/DzxeGAAA/uf3d+RhgCNUh/KOG98y4uFRzAoHTLA+ge9KpSONL3KFcNOo5oPIu1Q1XW2qphff05tHnJpC+XVeRgHt/SjS3RKNxK0ASjlkw8fDbqQU5BXjPbEq/E4gH9qNRDD2nrrWsr7lgZXPWmOVKGIsf94aiqsr7MvgRzakqNKaulQYFRZ/1O84Ri5vQDNs8OtIB3MCNUEFaibA8/28R4J05v5D1vH9iH/PzS4OrBN7EMaoGYP0QMS8scvmayxdc3EuE+D08RuPGq6zdT3GOVMyxqcdlWLYqOWlLg6MmTEFQMlinp5gPJWmXXHrRIB4I9YqC+yrYsM/Y14s0sCy3LZIjwjF4sutHlDo5M0lB/lft1Jn6KGVk56rj+Blzod6ZKxk1TSDSF1DHGZ0J56Lt7SapO7ApBO2BUGgQtKVeJfAx637wtaXPhzoWuSIlpOaUNt6ya00CeQgZvWIKcafvDNJUWQrqyX7sqnxwWIIf8Tyt7bxGWkTUKoFJz+fTXgqpJxFiC/c2NtRwTCuealJiSMmYv5vwyHD3krKoUHkNaasoy0ZVfxbIAEneK4WBHvsMU3EuNh8F77YhtLPJdf0MiPF+LoAAA=="
        />
      )}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {data.content && <BlockRendererClient value={data.content} />}
      </div>
    </>
  );
}
