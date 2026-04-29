import { createClient, type QueryParams } from '@sanity/client';
import { cache } from 'react';
import { Author, Blog, Homepage, Page, Slug } from '@/sanity.types';

import { apiVersion, dataset, projectId } from '../env';
import {
  getAboutPageQuery,
  getAllPostsQuery,
  getArticlesPageQuery,
  getAuthorQuery,
  getContactPageQuery,
  getDisclaimerPageQuery,
  getHomePageQuery,
  getPagedPostsQuery,
  getPostBySlugQuery,
  getPostCountQuery,
  getPrivacyPageQuery,
  getSearchResultsQuery
} from './queries';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  ignoreBrowserTokenWarning: true
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60,
  tags = []
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags
    }
  });
}

export const getHomePage = cache(async (): Promise<Homepage | undefined> => {
  return sanityFetch({ query: getHomePageQuery });
});

interface AllPostsProps {
  limit?: number;
  removeSlug?: string;
  removeFeatured?: string | boolean;
}

export const getAllPosts = cache(
  async ({
    limit = 99999,
    removeSlug = '',
    removeFeatured = ''
  }: AllPostsProps = {}): Promise<Blog[] | undefined> => {
    return sanityFetch({
      query: getAllPostsQuery,
      params: { limit, removeSlug, removeFeatured }
    });
  }
);

export const getPagedPosts = cache(
  async (page: number, pageSize: number): Promise<Blog[] | undefined> => {
    const offset = (page - 1) * pageSize;
    return sanityFetch({
      query: getPagedPostsQuery,
      params: { offset, pageSize }
    });
  }
);

export const getPostCount = cache(async (): Promise<number> => {
  return sanityFetch({ query: getPostCountQuery });
});

export const getPostBySlug = cache(
  async (slug: Slug | string): Promise<Blog | undefined> => {
    return sanityFetch({ query: getPostBySlugQuery, params: { slug } });
  }
);

export const getAboutPage = cache(async (): Promise<Page | undefined> => {
  return sanityFetch({ query: getAboutPageQuery });
});

export const getDisclaimerPage = cache(async (): Promise<Page | undefined> => {
  return sanityFetch({ query: getDisclaimerPageQuery });
});

export const getArticlesPage = cache(async (): Promise<Page | undefined> => {
  return sanityFetch({ query: getArticlesPageQuery });
});

export const getContactPage = cache(async (): Promise<Page | undefined> => {
  return sanityFetch({ query: getContactPageQuery });
});

export const getPrivacyPage = cache(async (): Promise<Page | undefined> => {
  return sanityFetch({ query: getPrivacyPageQuery });
});

export const getAuthor = cache(
  async (slug: Slug): Promise<Author | undefined> => {
    return sanityFetch({ query: getAuthorQuery, params: { slug } });
  }
);

export const getSearchResults = cache(
  async (queryString: string): Promise<Blog[] | undefined> => {
    const data = await sanityFetch({
      query: getSearchResultsQuery,
      params: { queryString },
      revalidate: 0
    });
    return data || [];
  }
);

export default client;
