import { createClient, type QueryParams } from 'next-sanity';
import { Author, Blog, Page, Slug } from '@/sanity.types';

import { apiVersion, dataset, projectId } from '../env';
import {
  getAboutPageQuery,
  getAllPostsQuery,
  getArticlesPageQuery,
  getAuthorQuery,
  getContactPageQuery,
  getHomePageQuery,
  getPostBySlugQuery,
  getPrivacyPageQuery
} from './queries';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: true,
  ignoreBrowserTokenWarning: true
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 60, // default revalidation time in seconds
  tags = []
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
      tags // for tag-based revalidation
    }
  });
}

export async function getHomePage(): Promise<Page | undefined> {
  const query = getHomePageQuery;
  const data = await sanityFetch({ query });

  return data || {};
}

interface AllPostsProps {
  limit?: number;
  removeSlug?: string;
  removeFeatured?: string | boolean;
}

export async function getAllPosts({
  limit = 99999,
  removeSlug = '',
  removeFeatured = ''
}: AllPostsProps = {}): Promise<Blog[] | undefined> {
  const query = getAllPostsQuery;
  const data = await sanityFetch({
    query,
    params: {
      limit,
      removeSlug,
      removeFeatured
    }
  });

  return data || [];
}

export async function getPostBySlug(slug: Slug): Promise<Blog | undefined> {
  const query = getPostBySlugQuery;
  const data = await sanityFetch({
    query,
    params: {
      slug
    }
  });

  return data || {};
}

export async function getAboutPage(): Promise<Page | undefined> {
  const query = getAboutPageQuery;
  const data = await sanityFetch({ query });

  return data || {};
}

export async function getArticlesPage(): Promise<Page | undefined> {
  const query = getArticlesPageQuery;
  const data = await sanityFetch({ query });

  return data || {};
}

export async function getContactPage(): Promise<Page | undefined> {
  const query = getContactPageQuery;
  const data = await sanityFetch({ query });

  return data || {};
}

export async function getPrivacyPage(): Promise<Page | undefined> {
  const query = getPrivacyPageQuery;
  const data = await sanityFetch({ query });

  return data || {};
}

export async function getAuthor(slug: Slug): Promise<Author | undefined> {
  const query = getAuthorQuery;
  const data = await sanityFetch({
    query,
    params: {
      slug
    }
  });

  return data || {};
}

export default client;
