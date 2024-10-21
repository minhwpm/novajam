import { Hero } from '@/components/sections/Hero/Hero';
import { Alert } from '@/components/sections/Alert/Alert';
import { ContentList } from '@/components/sections/ContentList/ContentList';
import { FeaturedContent } from '@/components/sections/FeaturedContent/FeaturedContent';
import { PageContentType } from '@/helpers/types';

function SectionComponentMapping({
  order,
  data,
}: {
  order: number;
  data: PageContentType;
}) {
  switch (data.contentType) {
    case 'hero':
      return <Hero data={data} order={order} />;
    case 'alert':
      return <Alert data={data} />;
    case 'featuredcontent':
      return <FeaturedContent data={data} />;
    case 'contentlist':
      return <ContentList data={data} />;
    default:
      return null;
  }
}

export const SectionMapping: React.FC<{
  data: Array<PageContentType>;
}> = ({ data }) => {
  return (
    <main className="flex flex-col min-h-screen">
      {data?.map((section, idx) => (
        <SectionComponentMapping key={idx} data={section} order={idx + 1} />
      ))}
    </main>
  );
};
