'use client';

import PostList from '@/components/PostList';
import { useCategory } from '@/components/store';
import { Blog } from '@/sanity.types';

export default function List({
  posts
}: {
  posts: Blog[];
} & React.ComponentProps<'ul'>) {
  const filtered = filterPosts(posts);

  if (!filtered.length) {
    return <div>No posts found...</div>;
  }

  return <PostList id="blog-list" className="scroll-m-36" posts={filtered} />;
}

export function filterPosts(posts: Blog[]) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { category } = useCategory();

  return posts.filter(
    (post) =>
      category === 'All' ||
      post.categories?.some(({ slug }) => slug?.current === category)
  );
}
