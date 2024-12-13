import { SectionMapping } from '@/components/sections/SectionMapping/SectionMapping';
import { notFound } from 'next/navigation';
import { getPage } from '@/helpers/query/getPage';
import { PageType } from '@/helpers/types';

export default async function Home() {
  const data = (await getPage('/')) as unknown as PageType;
  if (!data) {
    notFound();
  }
  return <SectionMapping data={data.content} />;
}
