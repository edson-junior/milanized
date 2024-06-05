import { Pages } from './pages.types';
import { Blogs } from './posts.types';

export async function getPosts(params: string = ''): Promise<Blogs> {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  };

  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/blogs?populate=*&${params}`,
    { headers }
  );

  const response = await posts.json();

  return response;
}

export async function getPages(params: string = ''): Promise<Pages> {
  const headers = {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
  };

  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pages?populate=*&${params}`,
    { headers }
  );

  const response = await posts.json();

  return response;
}
