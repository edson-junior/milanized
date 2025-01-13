import { Blog, Page } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Feed } from 'feed';
import groq from 'groq';

interface RSSProps {
  blog: Page;
  posts: Blog[];
}

export async function GET() {
  const { blog, posts }: RSSProps = await sanityFetch({
    query: groq`{
			'blog': *[_type == 'page' && metadata.slug.current == 'articles'][0] {
				_type,
				title,
				metadata {
          'slug': slug.current,
          title,
          description
        }
			},
			'posts': *[_type == 'blog' && !(_id in path('drafts.**'))] | order(_createdAt desc) {
				_type,
        _createdAt,
				content,
				publishDate,
				featuredImage,
        author->,
				metadata {
          'slug': slug.current,
          description,
          image,
          title
        }
			}
		}`
  });

  if (!blog || !posts) {
    return new Response(
      'Missing either a blog page or blog posts in Sanity Studio',
      { status: 500 }
    );
  }

  const url = `${process.env.CLIENT_URL}`;

  if (!blog?.metadata?.title || !blog.metadata?.slug) {
    return new Response(
      'Missing either a `metadata?.slug` or a `metadata?.title`',
      { status: 500 }
    );
  }

  const feed = new Feed({
    title: 'Milanized!',
    description:
      'Milanized! is an English-language site that helps internationals navigate life in Italy. Visit us for awesome tips.',
    link: url,
    id: url,
    copyright: `© ${new Date().getFullYear()} Milanized!`,
    favicon: `${process.env.CLIENT_URL}/favicon.ico`,
    image: `${process.env.CLIENT_URL}/opengraph-logo.png`,
    language: 'en',
    generator: process.env.CLIENT_URL
  });

  posts.map((post) => {
    const url = `${process.env.CLIENT_URL}/blog/${post.metadata?.slug}`;
    const publishedAt = post?.publishDate ? post?.publishDate : post._createdAt;
    const imageUrl = post.featuredImage
      ? urlFor(post.featuredImage).width(1200).url()
      : undefined;

    return feed.addItem({
      title: post.metadata?.title || '',
      description: post.metadata?.description,
      id: url,
      link: url,
      published: new Date(publishedAt),
      date: new Date(post._createdAt),
      author: [{ name: `${post?.author?.name}` }],
      enclosure: {
        url: imageUrl
          ? `${imageUrl.split('?')[0]}?${encodeURIComponent(imageUrl.split('?')[1])}`
          : '',
        length: 500,
        type: 'image/jpg'
      }
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8'
    }
  });
}
