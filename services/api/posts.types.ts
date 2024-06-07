import { BlocksContent } from '@strapi/blocks-react-renderer';

export interface Blogs {
  data: Data[];
  meta: Meta;
}

interface Data {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  featuredImage: FeaturedImage;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  category: string;
  summary: string;
  isFeatured: boolean;
  content: BlocksContent;
  slug: string;
  cloudinaryImage: CloudinaryImage;
}

interface CloudinaryImage {
  id: number;
  publicID: string;
  alt: string;
  title: string;
  caption: string | null;
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// featured image
export interface FeaturedImage {
  data: FeaturedImageData;
}

export interface FeaturedImageData {
  id: number;
  attributes: FeaturedImageAttributes;
}

export interface FeaturedImageAttributes {
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface Formats {
  thumbnail: Format;
  small: Format;
  medium: Format;
  large: Format;
}

export interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}
