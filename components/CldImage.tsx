'use client';

import { CldImage as CldImageDefault, CldImageProps } from 'next-cloudinary';

/** @param {import('next-cloudinary').CldImageProps} props  */
export default function CldImage({ ...props }: CldImageProps) {
  return <CldImageDefault {...props} />;
}
