import { Container }from "@/components/elements/Container/Container"
import { ExpertPreview } from "@/components/elements/Expert/ExpertPreview"
import { RichText2 } from "@/components/elements/RichText/RichText2"
import { BlogType } from "@/helpers/types"
import Image from "next/image"
import Link from "next/link"
import { format } from 'date-fns'

export const BlogDetails: React.FC<{data: BlogType}> = ({ data }) => {
  const { title, summary, content, media, topics, author, firstPublishedAt } = data
  return (
    <div>
      <Container>
        <article className="w-full my-10 flex flex-col gap-y-10">
          <h1 className="text-heading font-heading leading-tight font-bold text-5xl mt-10 max-w-5xl text-center mx-auto">
            {title}
          </h1>
          <div className="flex justify-center">
            <div className="lg:w-2/3">
              <p className="text-slate-600 text-lg prose lg:prose-lg max-w-none">
                {summary}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10">
            <div className="lg:w-2/3">
              <div className="text-neutral-500 font-semibold mb-4">
                {format(Date.parse(firstPublishedAt), 'MMMM dd, yyyy')}
              </div>
              
              {topics && topics?.length > 0  && 
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-4">
                    {topics.map((topic, idx) => (
                      <Link
                        key={idx}
                        className="px-4 py-2 text-sm lg:text-base rounded-assets relative bottom-0 hover:bottom-1 hover:text-primary-500 hover:bg-primary-100 transition-all duration-500 ease bg-primary-50 text-neutral-600 tracking-wider"
                        href={`/blog?topic=${topic}`}
                      >
                        {topic}
                      </Link>
                    ))}
                  </div>
                </div>
              }
            </div>
            {media && 
              <div className="lg:w-2/3 aspect-16/9">
                <Image  
                  className="w-full h-full object-cover"
                  src={media.url}
                  alt={media.title}
                  width={media.width}
                  height={media.height}
                />
              </div>
            }
          </div>
          <div className="flex flex-col items-center gap-10 text-lg">
            <div className="lg:w-2/3 mb-10 prose lg:prose-lg max-w-none overflow-x-hidden">
              <RichText2 data={content} style="blog" />
            </div>
            { author && 
              <div className="lg:w-2/3 text-lg mb-10">
                <p className="text-slate-600 tracking-wider text-sm md:text-base">
                  ABOUT THE AUTHOR
                </p>
                <ExpertPreview data={author} layout="horizontal" />
              </div>
            }
          </div>
        </article>
      </Container>
      <div className="bg-primary-50 py-14">
        <Container>
          <h2 className="text-3xl font-bold tracking-wider">
            DISCOVER MORE
          </h2>
          {/* @TODO implement <ContentList /> */}
        </Container>
      </div>
    </div>
  )
}