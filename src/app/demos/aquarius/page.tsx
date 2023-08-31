import getPage from "@/utils/contentful/graphql/getPage"
import Sections from "@/components/sections/Sections/Sections"

export default async function Home() {
  try {
    const data = await getPage("/demos/aquarius")
    return <Sections data={data.content} />
  } catch (e) {
    return (
      <main>
        404 Error Page
      </main>
    )
  }

}