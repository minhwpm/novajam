import { Metadata, ResolvingMetadata } from "next";
import { Container } from "@/components/elements/Container/Container"
import { BlogPost } from "@/components/sections/BlogPost/BlogPost"
import { LatestBlogs } from "@/components/sections/LatestBlogs/LatestBlogs"
import { BlogType } from "@/helpers/types"
import getBlogDetails from "@/helpers/contentful/graphql/getBlogDetails"
import getBlogs from "@/helpers/contentful/graphql/getBlogs"
import { notFound } from "next/navigation";

export async function generateMetadata(
{ params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  try {
    const data: BlogType = await getBlogDetails(params.slug)
    return {
      title: data.metaTitle ?? data.title,
      description: data.metaDescription ?? data.summary,
      keywords: data.metaKeywords,
      openGraph: {
        title: data.metaTitle ?? data.title,
        description: data.metaDescription ?? data.summary,
        images: [data.metaImage ?? "", ...previousImages ]
      }
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export default async function Page({ params }: {params: { slug: string } },) {
  const data = await getBlogDetails(params.slug)
  const latestBlogs = (await getBlogs(
    3,
    0,
    undefined,
    undefined,
    params.slug
  )) as Array<BlogType>;
  if (!data) {
    notFound()
  }
  return (
    <main className="flex flex-col gap-10 min-h-screen">
      <BlogPost data={data} />
      <div className="bg-primary-50 py-4 lg:py-10">
        <Container>
          <LatestBlogs title="DISCOVER MORE" data={latestBlogs} />
        </Container>
      </div>
    </main>
  )
}