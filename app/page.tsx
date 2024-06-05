import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts, getPages } from '../services/api';
import Heading from '@/components/ui/heading';
import CldImage from '@/components/CldImage';

const slug = 'homepage';

export async function generateMetadata() {
  const homepage = await getPages(`filters[slug][$eq]=${slug}`);

  const metaData: Metadata = {
    title: homepage.data[0].attributes.title,
    description: homepage.data[0].attributes.seo.metaDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_STRAPI_CLIENT_URL}`
    }
  };

  return metaData;
}

export default async function Home() {
  const posts = await getPosts();
  const homepage = await getPages(`filters[slug][$eq]=${slug}`);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6">
      <h1 className="absolute left-[-999em]">{`${homepage.data[0].attributes.seo.metaTitle} - ${homepage.data[0].attributes.title}`}</h1>
      {!posts.data?.length ? (
        <p>there are no blogposts</p>
      ) : (
        posts.data?.map(
          ({ id, attributes: { cloudinaryImage, slug, title, summary } }) => {
            return (
              <div
                className="group shadow-md rounded-sm overflow-hidden border border-border"
                key={id}
              >
                {cloudinaryImage && (
                  <Link href={`/${slug}`} className="block h-52">
                    <CldImage
                      width="250"
                      height="250"
                      src={cloudinaryImage.publicID}
                      alt={cloudinaryImage.alt}
                      title={cloudinaryImage.alt}
                      loading="eager"
                      priority
                      crop="fit"
                      className="block h-full w-full object-cover"
                    />
                  </Link>
                )}

                <div className="p-4 pb-6">
                  <Link
                    href={`/${slug}`}
                    className="col group-hover:text-blue-700"
                  >
                    <Heading className="text-xl block mb-4">{title}</Heading>
                  </Link>
                  <p className="text text-sm line-clamp-4 align-baseline">
                    {summary}
                  </p>
                </div>
              </div>
            );
          }
        )
      )}
    </div>
  );
}
