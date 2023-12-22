import getPage from "@/helpers/contentful/graphql/getPage"
import { Sections } from "@/components/sections/Sections/Sections"

export default async function Home() {
  const data = await getPage("/")
  if (!data) {
    throw new Error("Page Not Found")
  }
  return <Sections data={data.content} />
}
