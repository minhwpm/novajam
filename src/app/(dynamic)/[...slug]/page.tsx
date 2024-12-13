import { notFound } from 'next/navigation';
import { SectionMapping } from '@/components/sections/SectionMapping/SectionMapping';
import { getPage } from '@/helpers/query/getPage';
import { PageType } from '@/helpers/types';

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
