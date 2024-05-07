import Link from 'next/link';
import { blogPosts } from '../services/blogPosts';

export default async function Home() {
  const { data } = await blogPosts();

  return (
    <>
      {!data?.length ? (
        <p>there are no blogposts</p>
      ) : (
        data?.map((post) => {
          return (
            <Link href={`/${post?.attributes?.slug}`} key={post.id}>
              {post?.attributes?.title}
            </Link>
          );
        })
      )}
    </>
  );
}
