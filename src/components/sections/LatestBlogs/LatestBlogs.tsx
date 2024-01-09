import { BlogPreview } from "@/components/elements/BlogPreview/BlogPreview"
import { Section } from "@/components/elements/Section/Section"
import { BlogType } from "@/helpers/types"

export const LatestBlogs: React.FC<{data: Array<BlogType>}> = ({data}) => {
  return (
    <Section>
      <h2 className="text-3xl font-heading font-semibold text-neutral-500 mb-8">
        Latest articles
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12">
        {data.map(item => (
          <BlogPreview key={item.id} data={item} aspectRatio="4/3" />
        ))}
      </div>
    </Section>
  )
}