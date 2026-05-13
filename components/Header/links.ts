const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL ?? '';

export const links = [
  { href: `${BASE_URL}/blog`, text: 'Articles' },
  { href: `${BASE_URL}/about`, text: 'About' },
  { href: `${BASE_URL}/contact`, text: 'Contact' }
];
