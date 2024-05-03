"use client"
import Link from "next/link"
import { Container }from "@/components/elements/Container/Container"
import { ExpertPreview } from "@/components/elements/ExpertPreview/ExpertPreview"
import { RichText } from "@/components/elements/RichText/RichText"
import { BlogType } from "@/helpers/types"
import { format } from 'date-fns'
import { MediaItem } from "@/components/elements/MediaItem/MediaItem"

export const BlogPost: React.FC<{data: BlogType}> = ({ data }) => {
  const { title, summary, content, media, topics, author, firstPublishedAt } = data
  return (
    <div>
      <Container>
        <article className="w-full my-10 flex flex-col gap-y-10">
          <h1 className="text-heading font-heading leading-tight font-bold text-5xl mt-10 max-w-5xl text-center mx-auto">
            {title}
          </h1>
          <div className="flex flex-col lg:items-center gap-8">
            <div className="lg:w-3/4 xl:w-2/3">
              <p className="text-neutral-600 prose xl:prose-lg max-w-none">
                {summary}
              </p>
            </div>
            <div className="lg:w-3/4 xl:w-2/3">
              <div className="text-neutral-500 font-semibold mb-4">
                {format(Date.parse(firstPublishedAt), 'MMMM dd, yyyy')}
              </div>
              
              {topics && topics?.length > 0  && 
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-4">
                    {topics.map((topic, idx) => (
                      <Link
                        key={idx}
                        className="px-4 py-2 text-sm bg-primary-50 border border-primary-50 text-neutral-600 tracking-wider rounded-theme relative bottom-0 hover:bottom-1 hover:border-primary-500 transition-all duration-500 ease"
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
              <div className="lg:w-3/4 xl:w-2/3">
                <MediaItem data={media} aspectRatio="16/9" rounded="theme" />
              </div>
            }
          </div>
          <div className="flex flex-col items-center gap-10 text-lg">
            <div className="lg:w-3/4 xl:w-2/3 mb-10 prose xl:prose-lg max-w-none overflow-x-hidden">
              <RichText data={content} style="blog" />
            </div>
            { author && 
              <div className="lg:w-3/4 xl:w-2/3 text-lg">
                <p className="text-neutral-400 font-semibold tracking-wider text-sm md:text-base mb-8">
                  ABOUT THE AUTHOR
                </p>
                <ExpertPreview data={author} layout="horizontal" />
              </div>
            }
          </div>
        </article>
      </Container>
    </div>
  )
}