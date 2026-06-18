import { createClient, type QueryParams } from '@sanity/client';
import { cache } from 'react';
import { Author, Blog, Homepage, Page, Slug } from '@/sanity.types';

import { apiVersion, dataset, projectId } from '../env';
import {
  getAboutPageQuery,
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

// Lazy-initialized clients — deferred until first use so that missing env vars
// do not crash the module at evaluation time (e.g. during `next build`).

let _client: ReturnType<typeof createClient> | undefined;
let _publicClient: ReturnType<typeof createClient> | undefined;

// Authenticated client — used only when a token is required (e.g. draft mode).
function getAuthenticatedClient() {
  if (!_client) {
    _client = createClient({
      projectId,
      dataset,
      apiVersion,
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
      ignoreBrowserTokenWarning: true
    });
  }
  return _client;
}

// Public client — no token, CDN-backed. Use this for all public read-only queries.
function getPublicClient() {
  if (!_publicClient) {
    _publicClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true
    });
  }
  return _publicClient;
}

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
  return getPublicClient().fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags
    }
  });
}

export const getHomePage = cache(async (): Promise<Homepage | undefined> => {
  return sanityFetch({ query: getHomePageQuery });
});

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

export default getAuthenticatedClient;
