import BlogPreview from "@/components/elements/BlogPreview/BlogPreview"
import Container from "@/components/elements/Container/Container"
import getBlogs from "@/helpers/contentful/graphql/getBlogs"
import { BlogType } from "@/helpers/types"
import Pagination from "@/components/elements/Pagination/Pagination"

export default async function Page({ params } : { params: { number: number } } ) {
  const { number } = params
  try {
    const latestBlogs = await getBlogs(6, (number-1) * 6) as Array<BlogType>
    return (
      <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24 pt-20">
        <section className="mt-16">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
              {latestBlogs.map(item => (
                <BlogPreview key={item.id} data={item} aspectRatio="4/3" />
              ))}
            </div>
            <Pagination totalPages={4} currentPageNumber={params.number}/>
          </Container>
        </section>
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