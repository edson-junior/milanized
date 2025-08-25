import { sanityFetch } from '@/sanity/lib/client';
import groq from 'groq';
import { Key, Suspense } from 'react';
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
    <fieldset className="max-w-7xl mb-6 text-black">
      <legend className="sr-only">Filter by category</legend>

      <div className="filtering group flex flex-wrap gap-2">
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
