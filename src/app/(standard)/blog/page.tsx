import { Container } from "@/components/elements/Container/Container";
import { Pagination } from "@/components/elements/Pagination/Pagination";
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs/FeaturedBlogs";
import { LatestBlogs } from "@/components/sections/LatestBlogs/LatestBlogs";
import { BlogType, BLOG_PAGE_SIZE } from "@/helpers/types";
import getBlogs from "@/helpers/contentful/graphql/getBlogs";

type Props = {
  searchParams: { topic: string | string[] | undefined };
};

export default async function Page({ searchParams }: Props) {
  const { topic } = searchParams;
  const featuredBlogs = (await getBlogs(4, 0, true, topic as string[])) as Array<BlogType>;
  const latestBlogs = (await getBlogs(
    BLOG_PAGE_SIZE,
    0,
    false,
    topic as string[]
  )) as Array<BlogType>;

  return (
    <main className="flex flex-col min-h-screen pb-24">
      {featuredBlogs.length > 0 && <FeaturedBlogs data={featuredBlogs} /> }
      {latestBlogs.length > 0 && <LatestBlogs data={latestBlogs} /> }
      {(latestBlogs.length >= BLOG_PAGE_SIZE) && (
        <Container>
          <Pagination />
        </Container>
      )}
    </main>
  );
}
