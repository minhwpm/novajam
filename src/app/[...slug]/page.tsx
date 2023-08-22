import getPage from "@/utils/contentful/graphql/getPage"
import Sections from "@/components/sections/Sections/Sections"
import { Params } from "@/utils/types"


export default async function Home({
  params
}: {
  params: Params
}) {
  try {
    const data = await getPage(`/${params.slug.join('/')}`)
    return <Sections data={data.content} />
  } catch (e) {
    return (
      <main>
        404 Error Page
      </main>
    )
  }

}
