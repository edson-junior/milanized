import { groq } from 'next-sanity';
import { Key, Suspense } from 'react';
import { sanityFetch } from '@/sanity/lib/client';
import Filter from './Filter';

export default async function FilterList() {
  const categories = await sanityFetch({
    query: groq`*[
			_type == 'category' &&
			count(*[_type == 'blog' && references(^._id)]) > 0
		]|order(title)`
  });

  if (!categories) return null;

  return (
    <fieldset className="max-w-7xl mx-auto px-4 mb-6">
      <legend className="sr-only">Filter by category</legend>

      <div className="filtering group grid grid-cols-2 lg:flex lg:flex-wrap gap-4 max-sm:justify-between">
        <Suspense>
          <Filter label="All" />
          {categories?.map(
            (
              category: {
                title: string;
                slug: { current: string | undefined };
              },
              key: Key | null | undefined
            ) => (
              <Filter
                label={category.title}
                value={category.slug?.current}
                key={key}
              />
            )
          )}
        </Suspense>
      </div>
    </fieldset>
  );
}
