'use client';

import PostList from '@/components/PostList';
import { useCategory } from '@/components/store';
import { Blog } from '@/sanity.types';

export default function List({
  posts
}: {
  posts: Blog[];
} & React.ComponentProps<'ul'>) {
  const { category } = useCategory();
  const filterPosts = (posts: Blog[]) => {
    return posts.filter(
      (post) =>
        category === 'All' ||
        post.categories?.some(({ slug }) => slug?.current === category)
    );
  };

  const filtered = filterPosts(posts);

  if (!filtered.length) {
    return <div>No posts found...</div>;
  }

  return (
    <PostList
      id="blog-list"
      className="lg:min-h-[800px] scroll-m-20"
      posts={filtered}
    />
  );
}
