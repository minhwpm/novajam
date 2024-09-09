"use client"
import Link from "next/link"
import readingTime from 'reading-time'
import { Container }from "@/components/elements/Container/Container"
import { ExpertPreview } from "@/components/elements/ExpertPreview/ExpertPreview"
import { BlogType } from "@/helpers/types"
import { format } from 'date-fns'
import { MediaItem } from "@/components/elements/MediaItem/MediaItem"
import { MarkdownRenderer } from "@/components/elements/MarkdownRenderer/MarkdownRenderer"

export const BlogPost: React.FC<{data: BlogType}> = ({ data }) => {
  const { title, summary, content, media, topics, author, firstPublishedAt } = data
  const readingTimeStats = readingTime(content ?? "")
  return (
    <div>
      <Container>
        <article className="w-full my-10 flex flex-col pt-10">
          <h1 className="text-heading font-heading leading-tight font-bold text-5xl max-w-5xl text-center mx-auto">
            {title}
          </h1>
          <div className="mt-10 flex flex-col lg:items-center gap-8">
            {summary && (
              <div className="lg:w-3/4 xl:w-2/3 text-slate-500 prose xl:prose-lg max-w-none">
                <MarkdownRenderer>{summary}</MarkdownRenderer>
              </div>
            )}
            <div className="lg:w-3/4 xl:w-2/3">
              <div className="flex flex-wrap justify-between items-center mb-4">
                <div className="text-slate-500">
                  {format(Date.parse(firstPublishedAt), "MMMM dd, yyyy")}
                </div>
                {!!readingTimeStats?.minutes && (
                  <div className="text-slate-400 text-sm font-medium uppercase mb-5">
                    {readingTimeStats?.text}
                  </div>
                )}
              </div>
              
              {topics && topics?.length > 0 && (
                <div className="flex items-center gap-4">
                  <div className="text-sm tracking-wide text-slate-400">
                    TOPICS:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((topic, idx) => (
                      <Link
                        key={idx}
                        className="px-3 py-1.5 text-xs bg-slate-100 border border-slate-100 text-primary-600 tracking-wider rounded-theme hover:border-primary-600 transition-all duration-500 ease"
                        href={`/blog?topic=${topic}`}
                      >
                        {topic}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {media && (
              <div className="lg:w-3/4 xl:w-2/3">
                <MediaItem data={media} aspectRatio="16/9" rounded="theme" />
              </div>
            )}
          </div>
          <div className="mt-10 flex flex-col items-center gap-10 text-lg">
            <div className="lg:w-3/4 xl:w-2/3 mb-10 prose xl:prose-lg max-w-none overflow-x-hidden text-slate-500">
              <MarkdownRenderer>{content ?? ""}</MarkdownRenderer>
            </div>
            {author && (
              <div className="lg:w-3/4 xl:w-2/3 text-lg">
                <p className="text-slate-400 font-semibold tracking-wider text-sm md:text-base mb-8 text-center sm:text-start">
                  ABOUT THE AUTHOR
                </p>
                <ExpertPreview data={author} layout="horizontal" />
              </div>
            )}
          </div>
        </article>
      </Container>
    </div>
  );
}