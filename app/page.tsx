import Link from 'next/link';
import { blogPosts } from '../services/blogPosts';
import { Card, CardBody, Heading, Stack } from '@chakra-ui/react';
import Image from 'next/image';

// TODO: make the following metadata variables dynamic
const title = 'Milanized!';

export default async function Home() {
  const { data } = await blogPosts();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <h1 className="absolute left-[-999em]">{`The English-language website for internationals in Italy - ${title}`}</h1>
      {!data?.length ? (
        <p>there are no blogposts</p>
      ) : (
        data?.map((post) => {
          const featuredImage = post?.attributes.featuredImage.data?.attributes;

          return (
            <Card marginBottom="8" key={post.attributes.title}>
              <Link href={`/${post?.attributes?.slug}`} key={post.id}>
                <CardBody>
                  <Image
                    src={featuredImage?.url}
                    width={featuredImage?.width}
                    height={featuredImage?.height}
                    alt={featuredImage?.alternativeText || ''}
                    title={featuredImage?.alternativeText || ''}
                    loading="eager"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{post?.attributes?.title}</Heading>
                  </Stack>
                </CardBody>
              </Link>
            </Card>
          );
        })
      )}
    </div>
  );
}
