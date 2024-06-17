import { Container }from "@/components/elements/Container/Container"
import { Pagination }from "@/components/elements/Pagination/Pagination"
import { LatestBlogs } from "@/components/sections/LatestBlogs/LatestBlogs"
import { BlogType, BLOG_PAGE_SIZE } from "@/lib/types"
import getBlogs from "@/lib/query/getBlogs"
import { notFound } from "next/navigation"

type Props = { 
  params: { number: string }
  searchParams: { topic: string | string[] | undefined }
}

export default async function Page({ params, searchParams } : Props ) {
  const { topic } = searchParams
  const number = parseInt(params.number)
  const latestBlogs = (await getBlogs(
    BLOG_PAGE_SIZE,
    (number - 1) * BLOG_PAGE_SIZE,
    false,
    topic as string
  )) as Array<BlogType>;
  if (!latestBlogs.length) {
    notFound()
  }
  return (
    <main className="flex flex-col min-h-screen">
      {latestBlogs.length > 0 && <LatestBlogs data={latestBlogs} /> }
      {(latestBlogs.length >= BLOG_PAGE_SIZE) && (
        <Container>
          <Pagination currentPageNumber={number} />
        </Container>
      )}
    </main>
  )
}