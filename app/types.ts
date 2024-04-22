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
