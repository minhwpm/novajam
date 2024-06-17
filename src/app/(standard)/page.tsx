import { Metadata } from 'next'
import { SectionMapping } from "@/components/sections/SectionMapping/SectionMapping"
import { PageType } from "@/lib/types"
import getPage from "@/lib/query/getPage"
import { notFound } from 'next/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const data: PageType = await getPage("/")
  return {
    title: data?.metaTitle,
    description: data?.metaDescription,
    keywords: data?.metaKeywords,
    openGraph: {
      images: [data?.metaImage ?? "" ]
    }
  }
}

export default async function Home() {
  const data = await getPage("/")
  if (!data) {
    notFound()
  }
  return <SectionMapping data={data.content} />
}
