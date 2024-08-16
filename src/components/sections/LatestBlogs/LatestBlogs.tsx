import { BlogPreview } from "@/components/elements/BlogPreview/BlogPreview"
import { Container } from "@/components/elements/Container/Container"
import { BlogType } from "@/lib/types"

export const LatestBlogs: React.FC<{title?: string, data: Array<BlogType>}> = ({title, data}) => {
  return (
    <section className="py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24">
      <Container>
        <h2 className="text-3xl font-heading font-semibold text-primary-600 tracking-wide mb-8">
          {title ?? "Latest articles" }
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {data.map(item => (
            <BlogPreview key={item.id} data={item} aspectRatio="3/2" />
          ))}
        </div>
      </Container>
    </section>
  )
}