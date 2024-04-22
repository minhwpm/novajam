import { Metadata } from 'next'
import { SectionMapping } from "@/components/sections/SectionMapping/SectionMapping"
import { PageType } from "@/helpers/types"
import getPage from "@/helpers/contentful/graphql/getPage"

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data: PageType = await getPage("/")
    return {
      title: data.metaTitle,
      description: data.metaDescription,
      keywords: data.metaKeywords,
      openGraph: {
        images: [data.metaImage ?? "" ]
      }
    }
  } catch (e) {
    console.error(e)
    return {}
  }
}

export default async function Home() {
  const data = await getPage("/")
  if (!data) {
    throw new Error("Something went wrong")
  }
  return <SectionMapping data={data.content} />
}
