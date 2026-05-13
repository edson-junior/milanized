import groq from 'groq';
import { sanityFetch } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { Blog, Page } from '@/sanity.types';

interface RSSProps {
  blog: Page;
  posts: Blog[];
}

export async function GET() {
  const { blog, posts }: RSSProps = await sanityFetch({
    query: groq`{
			'blog': *[_type == 'page' && metadata.slug.current == 'blog'][0] {
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

  if (!blog?.metadata?.title || !blog.metadata?.slug) {
    return new Response(
      'Missing either a `metadata?.slug` or a `metadata?.title`',
      { status: 500 }
    );
  }

  const generateRss = () => {
    return `
      <rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
        <channel>
          <atom:link href="${process.env.CLIENT_URL}" rel="self" type="application/rss+xml"/>
          <title>Milanized!</title>
          <link>${process.env.CLIENT_URL}</link>
          <description>Milanized! is an English-language site that helps internationals navigate life in Italy. Visit us for awesome tips.</description>
          <generator>${process.env.CLIENT_URL}</generator>
          <language>en</language>
          <copyright>${`© ${new Date().getFullYear()} Milanized!`}</copyright>
          ${itemsList.join('')}
        </channel>
      </rss>
    `;
  };

  const itemsList = posts.map((post) => {
    const url = `${process.env.CLIENT_URL}/blog/${post.metadata?.slug}`;
    const publishedAt = post?.publishDate ? post?.publishDate : post._createdAt;
    const imageUrl = post.featuredImage
      ? urlFor(post.featuredImage).width(1200).url()
      : undefined;

    const mimeType = imageUrl
      ? /\.png(\?|$)/i.test(imageUrl)
        ? 'image/png'
        : /\.webp(\?|$)/i.test(imageUrl)
          ? 'image/webp'
          : 'image/jpeg'
      : undefined;

    return `
      <item>
        <title><![CDATA[${post.metadata?.title}]]></title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${new Date(publishedAt).toUTCString()}</pubDate>
        <description><![CDATA[${post.metadata?.description}]]></description>
        ${imageUrl ? `<enclosure length="0" type="${mimeType}" url="${imageUrl}"/>` : ''}
      </item>
    `;
  });

  return new Response(generateRss(), {
    headers: {
      'Content-Type': 'text/xml; charset=UTF-8'
    }
  });
}
