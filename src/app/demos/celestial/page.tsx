import getPage from "@/utils/contentful/graphql/getPage"
import Sections from "@/components/sections/Sections/Sections"

export default async function Home() {
  try {
    const data = await getPage("/demos/celestial")
    return <Sections data={data.content} />
  } catch(error) {
    return (
      <main>
        404 Error Page
      </main>
    )
  }
}
