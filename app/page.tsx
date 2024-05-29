import Link from 'next/link';
import { blogPosts } from '../services/blogPosts';
import Image from 'next/image';
import Heading from '@/components/ui/heading';

// TODO: make the following metadata variables dynamic
const title = 'Milanized!';

export default async function Home() {
  const { data } = await blogPosts();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
      <h1 className="absolute left-[-999em]">{`The English-language website for internationals in Italy - ${title}`}</h1>
      {!data?.length ? (
        <p>there are no blogposts</p>
      ) : (
        data?.map((post) => {
          const featuredImage = post?.attributes.featuredImage.data?.attributes;

          return (
            <div
              className="group shadow-md rounded-sm overflow-hidden border border-border"
              key={post.id}
            >
              <Link href={`/${post?.attributes?.slug}`} className="block h-52">
                <Image
                  className="as block h-full w-full object-cover"
                  src={featuredImage?.formats.small.url}
                  width={featuredImage?.width}
                  height={featuredImage?.height}
                  alt={featuredImage?.alternativeText || ''}
                  title={featuredImage?.alternativeText || ''}
                  loading="eager"
                />
              </Link>
              <div className="p-4 pb-6">
                <Link
                  href={`/${post?.attributes?.slug}`}
                  className="col group-hover:text-blue-700"
                >
                  <Heading className="text-xl block mb-4">
                    {post?.attributes?.title}
                  </Heading>
                </Link>
                <p className="text text-sm line-clamp-4 align-baseline">
                  {post?.attributes?.summary}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
