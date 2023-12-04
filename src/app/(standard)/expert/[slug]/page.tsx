import Container from "@/components/elements/Container/Container"
import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview"
import RichText2 from "@/components/elements/RichText/RichText2"
import getExpertDetails from "@/helpers/contentful/graphql/getExpertDetails"

export default async function Page({ params}: {params: {slug: string}},) {
  try {
    const data = await getExpertDetails(params.slug)
    return (
      <main className="flex flex-col gap-28 md:gap-40 min-h-screen pb-24">
        <Container>
          <div className="w-full lg:w-3/4 xl:w-2/3 mx-auto">
            <ExpertPreview data={data} layout="horizontal" />
            <div className="prose lg:prose-xl">
              <RichText2 data={data.description} />
            </div>
          </div>
        </Container>
      </main>
    )
  } catch (e) {
    console.error(e)
    return (
      <main>
        404 Error Page
      </main>
    )
  }
}