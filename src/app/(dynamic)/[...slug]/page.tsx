import { Metadata, ResolvingMetadata } from "next";
import { SectionMapping } from "@/components/sections/SectionMapping/SectionMapping";
import { BLOG_PAGE_SIZE, BlogType, PageType } from "@/helpers/types";
import { BlogPost } from "@/components/sections/BlogPost/BlogPost";
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs/FeaturedBlogs";
import { LatestBlogs } from "@/components/sections/LatestBlogs/LatestBlogs";
import { Container } from "@/components/elements/Container/Container";
import { Pagination } from "@/components/elements/Pagination/Pagination";
import getPage from "@/helpers/contentful/graphql/getPage";
import getBlogDetails from "@/helpers/contentful/graphql/getBlogDetails";
import getBlogs from "@/helpers/contentful/graphql/getBlogs";

export async function generateMetadata(
  { params }: { params: { slug: Array<string> } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  try {
    const data: PageType = await getPage(`/${params.slug!.join("/")}`);
    return {
      title: data.metaTitle,
      description: data.metaDescription,
      keywords: data.metaKeywords,
      openGraph: {
        images: [data.metaImage ?? "", ...previousImages],
      },
    };
  } catch (e) {
    console.error(e);
    return {};
  }
}

export default async function Page({ params }: { params: { slug: Array<string> } }) {
  if (params.slug![params.slug!.length - 1] === "blog") {
    const featuredBlogs = (await getBlogs(4, 0, true)) as Array<BlogType>;
    const latestBlogs = (await getBlogs(BLOG_PAGE_SIZE, 0)) as Array<BlogType>;
    return (
      <main className="flex flex-col min-h-screen pb-24">
        <FeaturedBlogs data={featuredBlogs} />
        <LatestBlogs data={latestBlogs} />
        <Container>
          <Pagination />
        </Container>
      </main>
    );
  }
  if (
    params.slug![params.slug!.length - 3] === "blog" &&
    params.slug![params.slug!.length - 2] === "page"
  ) {
    const pageNumber = parseInt(params.slug![params.slug!.length - 1]);
    const latestBlogs = (await getBlogs(
      BLOG_PAGE_SIZE,
      (pageNumber - 1) * BLOG_PAGE_SIZE
    )) as Array<BlogType>;
    return (
      <main className="flex flex-col min-h-screen pb-24">
        <LatestBlogs data={latestBlogs} />
        <Container>
          <Pagination currentPageNumber={pageNumber} />
        </Container>
      </main>
    );
  }
  if (
    params.slug!.find(
      (item, idx) => item === "blog" && idx + 2 === params.slug!.length
    )
  ) {
    const data = await getBlogDetails(params.slug![params.slug!.length - 1]);
    const latestBlogs = (await getBlogs(3, 0)) as Array<BlogType>;
    return (
      <main className="flex flex-col gap-10 lg:gap-12 2xl:gap-16 min-h-screen pb-24">
        <BlogPost data={data} />
        <div className="bg-primary-50 py-4 lg:py-10">
          <Container>
            <LatestBlogs title="DISCOVER MORE" data={latestBlogs} />
          </Container>
        </div>
      </main>
    );
  }

  const data = await getPage(`/${params.slug!.join("/")}`);
  return <SectionMapping data={data?.content} />;
}
