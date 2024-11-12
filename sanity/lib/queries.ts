import groq from 'groq';

export const getHomePageQuery = groq`*[_type == 'page' && metadata.slug.current == 'homepage'][0] {
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

export const getAllPostsQuery = groq`*[_type == 'blog' && !(_id in path('drafts.**'))]|order(_createdAt desc) {
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

export const getPostBySlugQuery = groq`*[_type == 'blog' && metadata.slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  summary,
  content[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => { "slug": @.reference-> metadata.slug },
    }
  },
  featuredImage,
  author->,
  'headings': content[style in ['h2', 'h3', 'h4', 'h5', 'h6']] {
    style,
    'text': pt::text(@)
  },
  "authorName": author->name,
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

export const getAuthorQuery = groq`*[_type == 'author' && slug.current == $slug][0] {
  _id,
  name,
  image,
  bio
}`;

export const getPrivacyPageQuery = groq`*[_type == 'page' && metadata.slug.current == 'privacy-policy'][0] {
  _id,
  title,
  content,
  metadata {
    title,
    description,
    'slug': slug.current,
  }
}`;

export const getContactPageQuery = groq`*[_type == 'page' && metadata.slug.current == 'contact'][0] {
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

export const getArticlesPageQuery = groq`*[_type == 'page' && metadata.slug.current == 'articles'][0] {
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

export const getAboutPageQuery = groq`*[_type == 'page' && metadata.slug.current == 'about'][0] {
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
