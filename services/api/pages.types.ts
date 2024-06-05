export interface Pages {
  data: Data[];
  meta: Meta;
}

interface Data {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  seo: SEO;
}

interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  preventIndexing: boolean;
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
