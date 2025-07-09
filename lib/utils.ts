import { type TransformationOptions, v2 } from 'cloudinary';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const cloudinary = v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[\s\W]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function createImageUrl(
  public_id: string,
  transformations: TransformationOptions = {}
) {
  const base_transformation: TransformationOptions = {
    quality: 'auto',
    format: 'auto'
  };

  const url = cloudinary.url(public_id, {
    transformation: [base_transformation, transformations]
  });

  return url;
}
