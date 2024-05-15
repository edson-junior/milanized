import Link from 'next/link';
import { blogPosts } from '../services/blogPosts';
import { Card, CardBody, Heading, Stack } from '@chakra-ui/react';
import Image from 'next/image';

export default async function Home() {
  const { data } = await blogPosts();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
