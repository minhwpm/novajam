import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { BlogPost } from "@/components/sections/BlogPost/BlogPost"
import { LatestBlogs } from "@/components/sections/LatestBlogs/LatestBlogs"
import { BlogType } from "@/lib/types"
import getBlogPost from "@/lib/query/getBlogPost"
import getBlogs from "@/lib/query/getBlogs"

export async function generateMetadata(
{ params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];
  const data: BlogType = await getBlogPost(params.slug)
  return {
    title: data?.metaTitle ?? data?.title,
    description: data?.metaDescription ?? data.summary,
    keywords: data?.metaKeywords,
    openGraph: {
      title: data?.metaTitle ?? data?.title,
      description: data?.metaDescription ?? data?.summary,
      images: [data?.metaImage ?? "", ...previousImages ]
    }
  }
}

export default async function Page({ params }: {params: { slug: string } },) {
  const data = await getBlogPost(params.slug)
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
      <LatestBlogs title="Discover more" data={latestBlogs} />
    </main>
  )
}