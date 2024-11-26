import { Blog } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/client';
import groq from 'groq';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const getAllSearchResults = async (
    request: NextRequest
  ): Promise<Blog[] | undefined> => {
    const queryString = request.nextUrl.searchParams.get('query');

    const getSearchResults = groq`
      *[_type in ["blog"] && !(_id in path('drafts.**')) && (title match $queryString + '*' || summary match $queryString + '*' || content[].children[].text match $queryString + '*')] | order(publishedAt desc) {
        _id,
        _createdAt,
        title,
        summary,
        content,
        featuredImage,
        isFeatured,
        metadata {
          'slug': slug.current
        }
      }
    `;

    const data = await sanityFetch({
      query: getSearchResults,
      params: {
        queryString
      }
    });

    return data || [];
  };

  try {
    const data = await getAllSearchResults(request);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
