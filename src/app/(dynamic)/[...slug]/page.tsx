import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { SectionMapping } from '@/components/sections/SectionMapping/SectionMapping';
import { BLOG_PAGE_SIZE, BlogType, PageType } from '@/helpers/types';
import { BlogPost } from '@/components/sections/BlogPost/BlogPost';
import { FeaturedBlogs } from '@/components/sections/FeaturedBlogs/FeaturedBlogs';
import { LatestBlogs } from '@/components/sections/LatestBlogs/LatestBlogs';
import { Pagination } from '@/components/elements/Pagination/Pagination';
import getPage from '@/helpers/query/getPage';
import getBlogPost from '@/helpers/query/getBlogPost';
import getBlogs from '@/helpers/query/getBlogs';

export async function generateMetadata(
  { params }: { params: { slug: Array<string> } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const data: PageType = await getPage(`/${params.slug!.join('/')}`);
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
  searchParams,
}: {
  params: { slug: Array<string> };
  searchParams: { topic: string | string[] | undefined };
}) {
  const { topic } = searchParams;
  if (params.slug![params.slug!.length - 1] === 'blog') {
    const featuredBlogs = (await getBlogs(4, 0, true)) as Array<BlogType>;
    const latestBlogs = (await getBlogs(
      BLOG_PAGE_SIZE,
      0,
      false,
      topic as string,
    )) as Array<BlogType>;
    return (
      <main className="flex flex-col min-h-screen">
        <FeaturedBlogs data={featuredBlogs} />
        <LatestBlogs data={latestBlogs} />
        <div className="container">
          <Pagination />
        </div>
      </main>
    );
  }
  if (
    params.slug![params.slug!.length - 3] === 'blog' &&
    params.slug![params.slug!.length - 2] === 'page'
  ) {
    const pageNumber = parseInt(params.slug![params.slug!.length - 1]);
    const latestBlogs = (await getBlogs(
      BLOG_PAGE_SIZE,
      (pageNumber - 1) * BLOG_PAGE_SIZE,
      false,
      topic as string,
    )) as Array<BlogType>;
    if (!latestBlogs.length) {
      notFound();
    }
    return (
      <main className="flex flex-col min-h-screen">
        <LatestBlogs data={latestBlogs} />
        <div className="container">
          <Pagination currentPageNumber={pageNumber} />
        </div>
      </main>
    );
  }
  if (
    params.slug!.find(
      (item, idx) => item === 'blog' && idx + 2 === params.slug!.length,
    )
  ) {
    const currentBlogSlug = params.slug![params.slug!.length - 1];
    const data = await getBlogPost(currentBlogSlug);
    const latestBlogs = (await getBlogs(
      3,
      0,
      undefined,
      undefined,
      currentBlogSlug,
    )) as Array<BlogType>;
    if (!data) {
      notFound();
    }
    return (
      <main className="flex flex-col gap-10 lg:gap-12 2xl:gap-16 min-h-screen">
        <BlogPost data={data} />
        <LatestBlogs title="Discover more" data={latestBlogs} />
      </main>
    );
  }

  const data = await getPage(`/${params.slug!.join('/')}`);
  if (!data) {
    notFound();
  }
  return <SectionMapping data={data.content} />;
}
