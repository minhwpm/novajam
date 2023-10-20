import BlogPreview from "@/components/elements/BlogPreview/BlogPreview"
import Container from "@/components/elements/Container/Container"
import Pagination from "@/components/elements/Pagination/Pagination"
import getBlogs from "@/helpers/contentful/graphql/getBlogs"
import { BlogType } from "@/helpers/types"

export default async function Page() {
  try {
    const featuredBlogs = await getBlogs(4, 0, true) as Array<BlogType>
    const latestBlogs = await getBlogs(6, 0) as Array<BlogType>
    console.log()
    return (
      <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
        <section className="mt-14">
          <Container>
            <h2 className="text-2xl font-semibold text-slate-600 mb-4">
              Featured
            </h2>
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <BlogPreview data={featuredBlogs[0]} />
              </div>
              <div className="lg:col-span-5 grid gap-8">
                {featuredBlogs.slice(1, 4).map(item => (
                  <BlogPreview key={item.id} data={item} orientation="horizontal" aspectRatio="4/3" />
                ))}
              </div>
            </div>
          </Container>
        </section>
        <section>
          <Container>
            <h2 className="text-2xl font-semibold text-slate-600 mb-4">
              Latest articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
              {latestBlogs.map(item => (
                <BlogPreview key={item.id} data={item} aspectRatio="4/3" />
              ))}
            </div>
            <Pagination totalPages={4} />
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