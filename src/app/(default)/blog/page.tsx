import getBlogs from "@/utils/contentful/graphql/getBlogs"

export default async function Page({ params}: {params: {slug: string}},) {
  try {
    const data = await getBlogs(5, 0)
    return (
      <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
        {/* <BlogDetails data={data} /> */}
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