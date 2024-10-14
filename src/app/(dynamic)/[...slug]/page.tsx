import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { SectionMapping } from '@/components/sections/SectionMapping/SectionMapping';
import { PageType } from '@/helpers/types';
import getPage from '@/helpers/query/getPage';

export async function generateMetadata(
  { params }: { params: { slug: Array<string> } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const data: PageType = (await getPage(
    `/${params.slug!.join('/')}`,
  )) as unknown as PageType;
  return {
    title: data?.metaTitle,
    description: data?.metaDescription,
    keywords: data?.metaKeywords,
    openGraph: {
      title: data?.metaTitle ?? '',
      description: data?.metaDescription ?? '',
      images: [data?.metaImage ?? '', ...previousImages],
    },
  };
}

export default async function Page({
  params,
}: {
  params: { slug: Array<string> };
}) {
  const data = (await getPage(
    `/${params.slug!.join('/')}`,
  )) as unknown as PageType;
  if (!data) {
    notFound();
  }
  return <SectionMapping data={data.content} />;
}
