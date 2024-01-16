import { Container }from "@/components/elements/Container/Container"
import { ExpertDetails } from "@/components/sections/ExpertDetails/ExpertDetails"
import getExpertDetails from "@/helpers/contentful/graphql/getExpertDetails"

export default async function Page({ params}: {params: {slug: string}},) {
  try {
    const data = await getExpertDetails(params.slug)
    return (
      <main className="flex flex-col gap-10 lg:gap-12 2xl:gap-16 min-h-screen pb-24 pt-20">
        <Container>
          <ExpertDetails data={data} />
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