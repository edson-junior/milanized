import BlockRendererClient from '@/app/components/BlockRenderClient';
import { blogPosts } from '../services/blogPosts';

interface BlogDetailsProps {
  params: { slug: string };
}

export default async function BlogDetails({ params }: BlogDetailsProps) {
  const { data } = await blogPosts(`filters[slug][$eq]=${params.slug}`);

  return <BlockRendererClient content={data[0]?.attributes.content} />;
}
