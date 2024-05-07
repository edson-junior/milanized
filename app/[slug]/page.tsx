import BlockRendererClient from '@/components/BlockRenderClient';
import { blogPosts } from '../../services/blogPosts';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text
} from '@chakra-ui/react';
import Image from 'next/image';

interface BlogDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogDetailsProps) {
  const { data } = await blogPosts(`filters[slug][$eq]=${params.slug}`);

  return {
    title: data[0]?.attributes?.title,
    description: data[0]?.attributes?.summary
  };
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
  const { data } = await blogPosts(`filters[slug][$eq]=${params.slug}`);
  const featuredImage = data[0]?.attributes.featuredImage.data?.attributes;

  return (
    <>
      <Heading as="h1" size="2xl" paddingTop="3" paddingBottom="2">
        {data[0]?.attributes?.title}
      </Heading>

      <div className="flex gap-2 py-4">
        <div>{data[0]?.attributes.category}</div>
        <span>-</span>
        <div>December 5, 2018</div>
        <span>-</span>
        <div>3 minute read</div>
      </div>

      <Image
        src={featuredImage?.url}
        width={featuredImage?.width}
        height={featuredImage?.height}
        alt={featuredImage?.alternativeText || ''}
      />

      {/* TODO: needs to be fixed */}
      {featuredImage?.caption && (
        <div dangerouslySetInnerHTML={{ __html: featuredImage?.caption }}></div>
      )}

      <br />
      <main className="flex flex-col md:flex-row gap-8">
        <article className="flex-1 md:w-64">
          <BlockRendererClient content={data[0]?.attributes.content} />
        </article>
        <aside className="flex-1 md:flex-none md:w-1/3 lg:w-1/4">
          <Heading as="h2" size="xl" paddingBottom="2">
            Related post
          </Heading>
          <Card maxW="sm" marginBottom="8">
            <CardBody>
              <Image
                src={featuredImage?.url}
                width={featuredImage?.width}
                height={featuredImage?.height}
                alt={featuredImage?.alternativeText || ''}
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Living room Sofa</Heading>
                <Text>
                  This sofa is perfect for modern tropical spaces, baroque
                  inspired spaces, earthy toned spaces and for people who love a
                  chic design with a sprinkle of vintage design.
                </Text>
              </Stack>
            </CardBody>

            <CardFooter>
              <Heading as="span" size="sm">
                April 16, 2024
              </Heading>
            </CardFooter>
          </Card>

          <div>
            <Heading as="h2" size="xl" py="2">
              Latest posts
            </Heading>

            <div className="pb-4">
              <Heading as="h4" size="md" paddingBottom="2">
                5 super benefits to studying at Nyenrode Business University
              </Heading>
              KATRIEN NIVERA 🇵🇭
            </div>

            <div className="pb-4">
              <Heading as="h4" size="md" paddingBottom="2">
                17 ideas that make the Dutch sustainability super-heroes JUNI
              </Heading>
              MOLTUBAK
            </div>

            <div className="pb-4">
              <Heading as="h4" size="md" paddingBottom="2">
                Watch out! Important timetable changes announced for 3 Dutch
                stations
              </Heading>
              LIANA PEREIRA 🇱🇰
            </div>

            <div className="pb-4">
              <Heading as="h4" size="md" paddingBottom="2">
                I had to pay €4 to use a toilet on King’s Day — and I’m pissed
              </Heading>
              {`SARAH O'LEARY 🇮🇪 - MAY 2, 2024`}
            </div>

            <div>
              <Heading as="h4" size="md" paddingBottom="2">
                The best phone plans for students in the Netherlands
              </Heading>
              LYNA MEYRER 🇱🇺 - MAY 1, 2024
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
