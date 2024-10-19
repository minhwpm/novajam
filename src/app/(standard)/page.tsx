import { Metadata } from 'next';
import { SectionMapping } from '@/components/sections/SectionMapping/SectionMapping';
import { PageType } from '@/helpers/types';
import getPage from '@/helpers/query/getPage';
import { notFound } from 'next/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const data = (await getPage('/')) as unknown as PageType;
  return {
    title: data?.metaTitle,
    description: data?.metaDescription,
    keywords: data?.metaKeywords,
    openGraph: {
      images: [data?.metaImage ?? ''],
    },
  };
}

export default async function Home() {
  const data = (await getPage('/')) as unknown as PageType;
  if (!data) {
    notFound();
  }
  return <SectionMapping data={data.content} />;
}
