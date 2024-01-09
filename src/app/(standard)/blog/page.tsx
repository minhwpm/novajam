import { Container }from "@/components/elements/Container/Container"
import { Pagination }from "@/components/elements/Pagination/Pagination"
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs/FeaturedBlogs"
import { LatestBlogs } from "@/components/sections/LatestBlogs/LatestBlogs"
import { BlogType } from "@/helpers/types"
import getBlogs from "@/helpers/contentful/graphql/getBlogs"

export default async function Page() {
  try {
    const featuredBlogs = await getBlogs(4, 0, true) as Array<BlogType>
    const latestBlogs = await getBlogs(6, 0) as Array<BlogType>
    return (
      <main className="flex flex-col min-h-screen pb-24 pt-20">
        <FeaturedBlogs data={featuredBlogs} />
        <LatestBlogs data={latestBlogs} />
        <Container>
          <Pagination totalPages={4} />
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