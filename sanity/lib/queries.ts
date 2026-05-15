import groq from 'groq';

export const getHomePageQuery = groq`*[_type == 'page' && metadata.slug.current == 'homepage'][0] {
  _id,
  title,
  mostRead[]-> {
    _id,
    summary,
    _createdAt,
    publishDate,
    featuredImage {
      ...,
      ...asset-> {
        ...metadata {
          lqip
        }
      }
    },
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
  },
  "featuredPost": *[_type == "blog" && !(_id in path('drafts.**')) && isFeatured == true] | order(_createdAt desc) [0] {
    _id,
    _createdAt,
    publishDate,
    title,
    summary,
    categories[]-> {
      title,
      slug
    },
    featuredImage {
      ...,
      ...asset-> {
        ...metadata {
          lqip
        }
      }
    },
    author-> {
      name,
    },
    metadata {
      'slug': slug.current
    }
  },
  "posts": *[_type == "blog" && !(_id in path('drafts.**')) && !(isFeatured == true)] | order(_createdAt desc) [0...6] {
    _id,
    _createdAt,
    publishDate,
    title,
    summary,
    featuredImage {
      ...,
      ...asset-> {
        ...metadata {
          lqip
        }
      }
    },
    isFeatured,
    metadata {
      'slug': slug.current
    }
  }
}`;

export const getAllPostsQuery = groq`*[_type == 'blog' && !(_id in path('drafts.**')) && metadata.slug.current != $removeSlug && !(isFeatured == $removeFeatured)] | order(_createdAt desc) [0...$limit] {
  _id,
  _createdAt,
  publishDate,
  title,
  summary,
  featuredImage {
    ...,
    ...asset-> {
      ...metadata {
        lqip
      }
    }
  },
  isFeatured,
  metadata {
    'slug': slug.current
  }
}`;

export const getPagedPostsQuery = groq`*[_type == 'blog' && !(_id in path('drafts.**'))] | order(_createdAt desc) [$offset...$offset + $pageSize] {
  _id,
  _createdAt,
  publishDate,
  title,
  summary,
  featuredImage {
    ...,
    ...asset-> {
      ...metadata {
        lqip
      }
    }
  },
  isFeatured,
  metadata {
    'slug': slug.current
  }
}`;

export const getPostCountQuery = groq`count(*[_type == 'blog' && !(_id in path('drafts.**'))])`;

export const getPostBySlugQuery = groq`*[_type == 'blog' && !(_id in path('drafts.**')) && metadata.slug.current == $slug][0] {
  _id,
  _createdAt,
  _updatedAt,
  publishDate,
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
    },
    _type == "image" => {
      ...,
      ...asset-> {
        ...metadata {
          lqip
        }
      }
    }
  },
  image,
  featuredImage {
    ...,
    ...asset-> {
      ...metadata {
        lqip
      }
    }
  },
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
    publishDate,
    featuredImage {
      ...,
      ...asset-> {
        ...metadata {
          lqip
        }
      }
    },
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
    title,
    noIndex
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
  "posts": *[_type == "blog" && !(_id in path('drafts.**')) && author._ref == ^._id] | order(_createdAt desc) {
    _id,
    _createdAt,
    publishDate,
    title,
    summary,
    featuredImage {
      ...,
      ...asset-> {
        ...metadata {
          lqip
        }
      }
    },
    isFeatured,
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

export const getArticlesPageQuery = groq`*[_type == 'page' && metadata.slug.current == 'blog'][0] {
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
  featuredImage {
    ...,
    ...asset-> {
      ...metadata {
        lqip
      }
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

export const getDisclaimerPageQuery = groq`*[_type == 'page' && metadata.slug.current == 'disclaimer'][0] {
  _id,
  title,
  content,
  featuredImage {
    ...,
    ...asset-> {
      ...metadata {
        lqip
      }
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

export const getSearchResultsQuery = groq`*[_type == "blog" && !(_id in path('drafts.**')) && (title match $queryString + '*' || summary match $queryString + '*' || content[].children[].text match $queryString + '*')] | order(_createdAt desc) {
  _id,
  _createdAt,
  title,
  summary,
  featuredImage {
    ...,
    ...asset-> {
      ...metadata {
        lqip
      }
    }
  },
  isFeatured,
  metadata {
    'slug': slug.current
  }
}`;
