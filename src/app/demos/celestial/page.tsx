import getPage from "@/utils/contentful/graphql/getPage"
import Sections from "@/components/sections"

export default async function Home() {
  try {
    const data = await getPage("/demos/celestial")
    console.log("PAGE DATA", data)
    return <Sections data={data.content} />
  } catch(error) {
    return (
      <main>
        404 Error Page
      </main>
    )
  }
}
