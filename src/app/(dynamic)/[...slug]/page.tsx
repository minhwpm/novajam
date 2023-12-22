import { Metadata, ResolvingMetadata } from 'next'
import { Sections } from "@/components/sections/Sections/Sections"
import { Params } from "@/helpers/types"
import { BlogDetails } from "@/components/sections/BlogDetails/BlogDetails"
import getPage from "@/helpers/contentful/graphql/getPage"
import getBlogDetails from "@/helpers/contentful/graphql/getBlogDetails"

export async function generateMetadata(
  { params } : {params: Params},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || []
  try {
    const data = await getPage(`/${params.slug!.join('/')}`)
    return {
      title: data.metaTitle,
      description: data.metaDescription,
      keywords: data.metaKeywords ?? data.tags ,
      openGraph: {
        images: [data.metaImage ? data.metaImage : {}, ...previousImages]
      }
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export default async function Page({ params }: { params: Params }) {
  let data
  if (params.slug!.find((item) => item === "blog")) {
    data = await getBlogDetails(params.slug![params.slug!.length - 1])
    return (
      <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
        <BlogDetails data={data} />
      </main>
    )
  }
  
  data = await getPage(`/${params.slug!.join('/')}`)
  if (!data) {
    throw new Error("Page Not Found")
  }
  return <Sections data={data.content} />
}
