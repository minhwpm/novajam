import { BlogPreview } from "@/components/elements/BlogPreview/BlogPreview"
import { Container } from "@/components/elements/Container/Container"
import { BlogType } from "@/helpers/types"

export const LatestBlogs: React.FC<{title?: string, data: Array<BlogType>}> = ({title, data}) => {
  return (
    <section className="py-10">
      <Container>
        <h2 className="text-3xl font-heading font-semibold text-neutral-600 tracking-wide mb-8">
          {title ?? "Latest articles" }
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
          {data.map(item => (
            <BlogPreview key={item.id} data={item} aspectRatio="4/3" />
          ))}
        </div>
      </Container>
    </section>
  )
}