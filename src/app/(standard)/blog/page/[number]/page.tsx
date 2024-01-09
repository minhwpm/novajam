import { Container }from "@/components/elements/Container/Container"
import getBlogs from "@/helpers/contentful/graphql/getBlogs"
import { BlogType } from "@/helpers/types"
import { Pagination }from "@/components/elements/Pagination/Pagination"
import { LatestBlogs } from "@/components/sections/LatestBlogs/LatestBlogs"

export default async function Page({ params } : { params: { number: string } } ) {
  const number = parseInt(params.number)
  try {
    const latestBlogs = await getBlogs(6, (number-1) * 6) as Array<BlogType>
    return (
      <main className="flex flex-col min-h-screen pb-24">
        <LatestBlogs data={latestBlogs} />
        <Container>
          <Pagination totalPages={4} currentPageNumber={number} />
        </Container>
      </main>
    )
  } catch (e) {
    console.error(e)
    return (
      <main>
        404 Error Page
      </main>
    )
  }
}