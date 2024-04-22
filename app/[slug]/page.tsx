import BlockRendererClient from '@/components/BlockRenderClient';
import { blogPosts } from '../services/blogPosts';

export default async function BlogDetails(props: { params: { slug: string } }) {
  const params = `filters[slug][$eq]=${props.params.slug}`;

  const { data } = await blogPosts(params);

  return (
    <>
      <BlockRendererClient content={data[0]?.attributes.content} />
    </>
  );
}
