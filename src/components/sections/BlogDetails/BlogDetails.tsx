import Container from "@/components/elements/Container/Container"
import RichText from "@/components/elements/RichText/RichText"
import { BlogType } from "@/utils/types"
import Image from "next/image"

const BlogDetails: React.FC<{data: BlogType}> = ({ data }) => {
  const { title, summary, content, media } = data
  return (
    <div>
      <Container>
        <article className="w-full my-10 flex flex-col gap-y-10">
          <h1 className="font-heading font-bold text-5xl mt-10 leading-snug max-w-5xl">
            {title}
          </h1>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 prose lg:prose-xl max-w-none">
              <p className="text-slate-600 text-lg">
                {summary}
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-10">
            {media && 
              <div className="lg:col-span-2 aspect-16/9">
                <Image  
                  className="w-full h-full object-cover"
                  src={media.url}
                  alt={media.title}
                  width={media.width}
                  height={media.height}
                />
              </div>
            }
            <div className="lg:col-span-1">
              <div>
                PUBLISHED

              </div>
              <div>
                AUTHOR

              </div>
              <div>
                CATEGORY
              </div>
              <div>
                TOPICS
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 text-lg">
            <div className="lg:col-span-2 mb-10 prose lg:prose-xl max-w-none">
              <RichText htmlString={content} />
            </div>
          </div>
          <div>
            <p>ABOUT THE AUTHOR</p>
            {/* @TODO implement <Author /> */}
          </div>
          
        </article>
      </Container>
      <div className="bg-primary-50 py-14">
        <Container>
          <h2 className="text-3xl font-bold tracking-wider">
            DISCOVER MORE
          </h2>
          {/* @TODO implement <CardList /> */}
        </Container>
      </div>
    </div>
  )
}

export default BlogDetails