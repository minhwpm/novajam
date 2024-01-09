import { Metadata, ResolvingMetadata } from 'next'
import { Sections } from "@/components/sections/Sections/Sections"
import { BlogType, PageType, Params } from "@/helpers/types"
import { BlogDetails } from "@/components/sections/BlogDetails/BlogDetails"
import { FeaturedBlogs } from '@/components/sections/FeaturedBlogs/FeaturedBlogs'
import { LatestBlogs } from '@/components/sections/LatestBlogs/LatestBlogs'
import { Container } from '@/components/elements/Container/Container'
import { Pagination } from '@/components/elements/Pagination/Pagination'
import getPage from "@/helpers/contentful/graphql/getPage"
import getBlogDetails from "@/helpers/contentful/graphql/getBlogDetails"
import getBlogs from '@/helpers/contentful/graphql/getBlogs'

export async function generateMetadata(
  { params } : {params: Params},
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || []
  try {
    const data: PageType = await getPage(`/${params.slug!.join('/')}`)
    return {
      title: data.metaTitle,
      description: data.metaDescription,
      keywords: data.metaKeywords,
      openGraph: {
        images: [data.metaImage ?? "" , ...previousImages]
      }
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export default async function Page({ params }: { params: Params }) {
  
  if (params.slug![params.slug!.length - 1] === "blog") {
    const featuredBlogs = await getBlogs(4, 0, true) as Array<BlogType>
    const latestBlogs = await getBlogs(6, 0) as Array<BlogType>
    return (
      <main className="flex flex-col min-h-screen pb-24 pt-20">
        <FeaturedBlogs data={featuredBlogs} />
        <LatestBlogs data={latestBlogs} />
        <Container>
          {/* @TODO totalPages */}
          <Pagination totalPages={4} />
        </Container>
      </main>
    )
  }
  if (params.slug![params.slug!.length - 3] === "blog" && params.slug![params.slug!.length - 2] === "page") {
    const pageNumber = parseInt(params.slug![params.slug!.length - 1])
    const latestBlogs = await getBlogs(6, (pageNumber-1) * 6) as Array<BlogType>
    return (
      <main className="flex flex-col min-h-screen pb-24 pt-20">
        <LatestBlogs data={latestBlogs} />
        <Container>
          {/* @TODO totalPages */}
          <Pagination totalPages={4} currentPageNumber={pageNumber} />
        </Container>
      </main>
    )
  }
  if (params.slug!.find((item, idx) => item === "blog" && idx + 2 === params.slug!.length)) {
    const data = await getBlogDetails(params.slug![params.slug!.length - 1])
    return (
      <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
        <BlogDetails data={data} />
      </main>
    )
  }

  const data = await getPage(`/${params.slug!.join('/')}`)
  return <Sections data={data.content} />
}
