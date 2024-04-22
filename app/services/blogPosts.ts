import { Blogs } from '@/app/types';

export async function blogPosts(params: string = ''): Promise<Blogs> {
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
