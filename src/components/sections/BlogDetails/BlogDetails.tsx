import Container from "@/components/elements/Container/Container"
import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview"
import RichText from "@/components/elements/RichText/RichText"
import { BlogType } from "@/helpers/types"
import Image from "next/image"
import Link from "next/link"

const BlogDetails: React.FC<{data: BlogType}> = ({ data }) => {
  const { title, summary, content, media, topics, author } = data
  return (
    <div>
      <Container>
        <article className="w-full my-10 flex flex-col gap-y-10">
          <h1 className="font-heading font-bold text-5xl mt-10 leading-snug max-w-5xl">
            {title}
          </h1>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <p className="text-slate-600 text-lg prose lg:prose-xl max-w-none">
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
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div>
                PUBLISHED

              </div>
              {author && author.fullName && 
                <div>
                  AUTHOR
                  {author.fullName}
                </div>
              }
              {topics && topics?.length > 0  && 
                <div className="flex flex-col gap-2">
                  <p className="text-slate-600 tracking-wider text-sm">
                    TOPICS
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {topics.map((topic, idx) => (
                      <Link
                        key={idx}
                        className="px-4 py-2 rounded-full bg-primary-50 border-primary-100 text-slate-600 text-sm tracking-wider"
                        href={`/blog?topic=${topic}`}
                      >
                        {topic}
                      </Link>
                    ))}
                  </div>
                </div>
              }
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 text-lg">
            <div className="lg:col-span-2 mb-10 prose lg:prose-xl max-w-none">
              <RichText htmlString={content} />
              
            </div>
          </div>

          { author && 
            <div className="grid lg:grid-cols-3 gap-10 text-lg">
              <div className="lg:col-span-2 mb-10">
                <p className="text-slate-600 tracking-wider text-sm md:text-base">
                  ABOUT THE AUTHOR
                </p>
                <ExpertPreview data={author} layout="row" />
              </div>
            </div>
          }

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