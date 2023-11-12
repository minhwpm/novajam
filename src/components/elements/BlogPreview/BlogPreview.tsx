'use client'
import classNames from "classnames"
import Link from "next/link"
import { BlogType } from "@/helpers/types"
import { usePathname } from "next/navigation"
import { MediaItem } from "../MediaItem/MediaItem"

interface Props {
  data: BlogType
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
  orientation?: "vertical" | "horizontal"
}

const BlogPreview: React.FC<Props> = ({
  data,
  aspectRatio = "3/2",
  orientation = "vertical"
}) => {
  const { title, slug, media, topics } = data
  const pathname = usePathname()
  if (orientation === "vertical") {
    return (
      <div className="rounded-assets bg-white">
        <Link href={`${pathname}/blog/${slug}`}>
          <MediaItem data={media} aspectRatio={aspectRatio} />
          <div className={classNames(
            "w-full p-5 flex flex-col gap-y-2",
          )}>
            <div className="text-xs uppercase tracking-widest flex flex-wrap gap-x-5 gap-y-1">
              {topics && topics.length > 0 && topics.map((topic, idx) => (
                <div key={idx}>{topic}</div>
              ))}
            </div>
            <h4 className="text-lg lg:text-xl font-semibold mt-1">
              {title}
            </h4>
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
            <MediaItem data={media} aspectRatio={aspectRatio} />
          </div>
          <div className="col-span-8 flex flex-col gap-y-2">
            <div className="text-xs uppercase tracking-widest flex flex-wrap gap-x-5 gap-y-1">
              {topics && topics.length > 0 && topics.map((topic, idx) => (
                <div key={idx}>{topic}</div>
              ))}
            </div>
            <h4 className="lg:text-lg font-semibold mt-1">
              {title}
            </h4>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogPreview