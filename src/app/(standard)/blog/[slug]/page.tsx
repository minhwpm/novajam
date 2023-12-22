import { BlogDetails } from "@/components/sections/BlogDetails/BlogDetails"
import getBlogDetails from "@/helpers/contentful/graphql/getBlogDetails"

export default async function Page({ params }: {params: { slug: string } },) {
  try {
    const data = await getBlogDetails(params.slug)
    return (
      <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24 pt-20">
        <BlogDetails data={data} />
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