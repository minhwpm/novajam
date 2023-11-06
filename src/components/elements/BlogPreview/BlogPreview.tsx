'use client'
import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { BlogType, ImageType } from "@/helpers/types"
import { usePathname } from "next/navigation"

interface Props {
  data: BlogType
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
  orientation?: "vertical" | "horizontal"
}

const BlogThumbnail: React.FC<{
  media: ImageType
  title: string
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
}> = ({ media, title, aspectRatio}) => {
  return (
    <div className={classNames(
      { "aspect-video" : aspectRatio === "video"},
      { "aspect-square" : aspectRatio === "square"},
      { "aspect-3/4" : aspectRatio === "3/4"},
      { "aspect-4/3" : aspectRatio === "4/3"},
      { "aspect-3/2" : aspectRatio === "3/2"}
    )}>
      <Image
        className="w-full h-full object-cover rounded-assets"
        src={media?.url ?? '/bluebiz_square.webp'}
        width={media?.width ?? 1600} 
        height={media?.height ?? 900}
        alt={media?.title ?? title}
      />
    </div>
  )
}

const BlogText: React.FC<{
  title: string
  summary?: string
  topics?: Array<string>
}> = ({topics, title, summary}) => {
  return (
    <>
      <div className="text-xs uppercase tracking-widest flex flex-wrap gap-3">
        {topics && topics.length > 0 && topics.map((topic, idx) => (
          <div key={idx}>{topic}</div>
        ))}
      </div>
      <h4 className="text-lg lg:text-xl font-semibold mt-1">
        {title}
      </h4>
      {summary && 
        <p className="text-slate-700 mt-2 line-clamp-2">
          {summary}
        </p>
      }
    </>
  )
}

const BlogPreview: React.FC<Props> = ({
  data,
  aspectRatio = "3/2",
  orientation = "vertical"
}) => {
  const { title, summary, slug, media, topics } = data
  const pathname = usePathname()
  if (orientation === "vertical") {
    return (
      <div>
        <Link href={`${pathname}/blog/${slug}`}>
          <BlogThumbnail media={media} title={title} aspectRatio={aspectRatio} />
          <div className={classNames(
            "w-full py-5",
          )}>
            <BlogText title={title} summary={summary} topics={topics}/>
          </div>
        </Link>
      </div>
    )
  }
  return (
    <div>
      <Link href={`${pathname}/blog/${slug}`}>
        <div className="w-full grid grid-cols-12 gap-5">
          <div className="col-span-4">
            <BlogThumbnail media={media} title={title} aspectRatio={aspectRatio} />
          </div>
          <div className="col-span-8">
            <BlogText title={title} summary={summary} topics={topics}/>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogPreview