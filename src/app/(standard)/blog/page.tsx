import { Metadata, ResolvingMetadata } from 'next';
import { Pagination } from '@/components/elements/Pagination/Pagination';
import { FeaturedBlogs } from '@/components/sections/FeaturedBlogs/FeaturedBlogs';
import { LatestBlogs } from '@/components/sections/LatestBlogs/LatestBlogs';
import { BlogType, BLOG_PAGE_SIZE } from '@/helpers/types';
import getBlogs from '@/helpers/query/getBlogs';

type PageProps = {
  searchParams: { topic: string | string[] | undefined };
};

export async function generateMetadata(
  _pageProps: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousMetadata = await parent;
  return {
    title: `Blog ${
      previousMetadata.title ? `| ${previousMetadata.title}` : ''
    }`,
    description: previousMetadata.description ?? '',
    keywords: previousMetadata.keywords ?? '',
    openGraph: {
      title: `Blog ${
        previousMetadata.title ? `| ${previousMetadata.title}` : ''
      }`,
      description: previousMetadata.description ?? '',
      images: [...(previousMetadata.openGraph?.images || [])],
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { topic } = searchParams;
  const featuredBlogs = (await getBlogs(
    4,
    0,
    true,
    topic as string,
  )) as Array<BlogType>;
  const latestBlogs = (await getBlogs(
    BLOG_PAGE_SIZE,
    0,
    false,
    topic as string,
  )) as Array<BlogType>;

  return (
    <main className="flex flex-col min-h-screen">
      {featuredBlogs.length > 0 && <FeaturedBlogs data={featuredBlogs} />}
      {latestBlogs.length > 0 && <LatestBlogs data={latestBlogs} />}
      {latestBlogs.length >= BLOG_PAGE_SIZE && (
        <div className="container">
          <Pagination />
        </div>
      )}
    </main>
  );
}
