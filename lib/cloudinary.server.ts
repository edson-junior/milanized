import { type TransformationOptions, v2 } from 'cloudinary';

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const cloudinary = v2;

export function createImageUrl(
  public_id: string,
  transformations: TransformationOptions = {}
) {
  const base_transformation: TransformationOptions = {
    quality: 'auto',
    format: 'auto'
  };

  return cloudinary.url(public_id, {
    transformation: [base_transformation, transformations]
  });
}
