import { notFound } from 'next/navigation';
import { SectionMapping } from '@/components/sections/SectionMapping/SectionMapping';
import { getPage } from '@/lib/query/getPage';

type Params = Promise<{ slug: string[] }>;
export default async function Page(props: { params: Params }) {
  const { slug } = await props.params;
  const data = await getPage(`/${slug!.join('/')}`);
  if (!data) {
    notFound();
  }
  return <SectionMapping data={data.content} />;
}
