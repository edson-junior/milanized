import groq from 'groq';
import type { MetadataRoute } from 'next';
import { sanityFetch } from '@/sanity/lib/client';

interface Sitemap {
  pages: SitemapItem[];
  blog: SitemapItem[];
}

interface SitemapItem {
  url: string;
  lastModified: Date;
  priority: number;
}

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap | undefined
> {
  const data: Sitemap | undefined = await sanityFetch({
    query: groq`{
			'pages': *[
				_type == 'page' &&
				!(metadata.slug.current in ['404', 'blog/*']) &&
				metadata.noIndex != true
			]|order(metadata.slug.current){
				'url': $baseUrl + select(metadata.slug.current == 'homepage' => '', metadata.slug.current),
				'lastModified': _updatedAt,
				'priority': select(
					metadata.slug.current == 'homepage' => 1,
					0.5
				),
			},
			'blog': *[_type == 'blog' && !(_id in path('drafts.**')) && metadata.noIndex != true]|order(name){
				'url': $baseUrl + 'blog/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'priority': 0.4
			},
      'author': *[_type == 'author' && metadata.noIndex != true]|order(name){
				'url': $baseUrl + 'author/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'priority': 0.3
			}
		}`,
    params: {
      baseUrl: process.env.CLIENT_URL + '/'
    }
  });

  if (data) {
    return Object.values(data).flat();
  }
}
