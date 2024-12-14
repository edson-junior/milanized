import { groq } from 'next-sanity';
import { Key, Suspense } from 'react';
import css from './FilterList.module.css';
import { cn } from '@/lib/utils';
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
    <fieldset>
      <legend className="sr-only">Filter by category</legend>

      <div
        className={cn(
          css.list,
          'filtering group flex flex-wrap gap-1 max-sm:justify-center'
        )}
      >
        <Suspense>
          <Filter label="All categories" />

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
