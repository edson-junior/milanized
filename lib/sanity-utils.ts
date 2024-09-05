import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import client, { sanityFetch } from '@/client';
import { Blog, Page, Slug } from '@/sanity.types';

export function urlFor(source: SanityImageSource) {
  return imageUrlBuilder(client).image(source);
}

export async function getHomePage(): Promise<Page | undefined> {
  const query = `*[_type == 'page' && metadata.slug.current == 'homepage'][0] {
    _id,
    title,
    metadata {
      'slug': slug.current,
      title,
      noIndex,
      image,
      description
    }
  }`;

  try {
    const data = await sanityFetch({ query });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPosts(): Promise<Blog[] | undefined> {
  const query = `*[_type == 'blog' && !(_id in path('drafts.**'))]|order(_createdAt desc) {
    _id,
    _createdAt,
    title,
    summary,
    content,
    featuredImage,
    isFeatured,
    metadata {
      'slug': slug.current
    }
  }`;

  try {
    const data = await sanityFetch({ query });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPosts(slug: Slug): Promise<Blog | undefined> {
  const query = `*[_type == 'blog' && metadata.slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    summary,
    content,
    featuredImage,
    author->,
    "authorImage": author->image,
    "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180),
    metadata {
      'slug': slug.current,
      slug,
      description,
      image,
      title
    }
  }`;

  try {
    const data = await sanityFetch({
      query,
      params: {
        slug
      }
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAboutPage(): Promise<Page | undefined> {
  const query = `*[_type == 'page' && metadata.slug.current == 'about'][0] {
    _id,
    title,
    content,
    featuredImage,
    metadata {
      'slug': slug.current,
      title,
      noIndex,
      image,
      description
    }
  }`;

  try {
    const data = await sanityFetch({ query });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getArticlesPage(): Promise<Page | undefined> {
  const query = `*[_type == 'page' && metadata.slug.current == 'articles'][0] {
    _id,
    title,
    metadata {
      'slug': slug.current,
      title,
      noIndex,
      image,
      description
    }
  }`;

  try {
    const data = await sanityFetch({ query });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getContactPage(): Promise<Page | undefined> {
  const query = `*[_type == 'page' && metadata.slug.current == 'contact'][0] {
    _id,
    title,
    content,
    metadata {
      'slug': slug.current,
      title,
      noIndex,
      image,
      description
    }
  }`;

  try {
    const data = await sanityFetch({ query });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getPrivacyPage(): Promise<Page | undefined> {
  const query = `*[_type == 'page' && metadata.slug.current == 'privacy-policy'][0] {
    _id,
    title,
    content,
    metadata {
      title,
      description,
      'slug': slug.current,
    }
  }`;

  try {
    const data = await sanityFetch({ query });

    return data;
  } catch (error) {
    console.error(error);
  }
}
