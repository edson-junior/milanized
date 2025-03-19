import groq from 'groq';

export const getHomePageQuery = groq`*[_type == 'page' && metadata.slug.current == 'homepage'][0] {
  _id,
  title,
  mostRead[]-> {
    _id,
    summary,
    author->,
    _createdAt,
    featuredImage,
    title,
    metadata {
      'slug': slug.current,
    }
  },
  metadata {
    'slug': slug.current,
    title,
    noIndex,
    image,
    description
  }
}`;

export const getAllPostsQuery = groq`*[_type == 'blog' && !(_id in path('drafts.**')) && metadata.slug.current != $removeSlug && !(isFeatured == $removeFeatured)] | order(_createdAt desc) [0...$limit] {
  _id,
  _createdAt,
  title,
  summary,
  content,
  featuredImage,
  isFeatured,
  categories[]->,
  author-> {
    name,
  },
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
  hasAffiliateLinks,
  content[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => { "slug": @.reference-> metadata.slug },
    },
    ctas[]{
      ...,
      link {
        ...,
        internal-> {
          metadata {
            'slug': slug.current
          }
        }
      }
    }
  },
  featuredImage,
  author-> {
    name,
    metadata {
      'slug': slug.current
    },
    image,
    bio,
    social,
  },
  'headings': content[style in ['h2', 'h3', 'h4', 'h5', 'h6']] {
    style,
    'text': pt::text(@)
  },
  publishDate,
  "estimatedReadingTime": round(length(pt::text(content)) / 5 / 180),
  relatedArticles[]-> {
    _id,
    summary,
    author->,
    _createdAt,
    featuredImage,
    title,
    metadata {
      'slug': slug.current,
    }
  },
  metadata {
    'slug': slug.current,
    slug,
    description,
    image,
    title
  }
}`;

export const getAuthorQuery = groq`*[_type == 'author' && metadata.slug.current == $slug][0] {
  _id,
  name,
  image,
  bio,
  metadata {
    title,
    description,
    'slug': slug.current,
  },
  "posts": *[_type == "blog" && author._ref in *[_type=="author" && name == name ]._id ]{
    _id,
    _createdAt,
    title,
    summary,
    content,
    featuredImage,
    isFeatured,
    categories[]->,
    metadata {
      'slug': slug.current
    }
  }
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

export const getDisclaimerPageQuery = groq`*[_type == 'page' && metadata.slug.current == 'affiliate-link-disclaimer'][0] {
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
