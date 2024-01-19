"use client"
import classNames from "classnames"
import Link from "next/link"
import { BlogType, MediaAspectRatioType } from "@/helpers/types"
import { usePathname } from "next/navigation"
import { MediaItem } from "../MediaItem/MediaItem"

interface Props {
  data: BlogType
  aspectRatio?: MediaAspectRatioType
  layout?: "vertical" | "horizontal"
}

export const BlogPreview: React.FC<Props> = ({
  data,
  aspectRatio = "3/2",
  layout = "vertical"
}) => {
  const { title, slug, media, topics } = data
  const pathname = usePathname()
  if (layout === "vertical") {
    return (
      <div className="rounded-assets bg-white">
        <Link href={`${pathname}/blog/${slug}`}>
          <MediaItem data={media} aspectRatio={aspectRatio} />
          <div className={classNames(
            "w-full px-5 pt-5 pb-10 flex flex-col gap-y-2",
          )}>
            <div className="text-xs text-primary-600 uppercase tracking-widest flex flex-wrap gap-x-5 gap-y-1">
              {topics && topics.length > 0 && topics.map((topic, idx) => (
                <Link
                  key={idx}
                  className="underline-hover-effect"
                  href={`${pathname}/blog?topic=${topic}`}
                >
                  {topic}
                </Link>
              ))}
            </div>
            <h4 className="text-lg font-semibold mt-1 hover:text-primary-600 transition-colors duration-500">
              {title}
            </h4>
          </div>
        </Link>
      </div>
    )
  }
  return (
    <div className="rounded-assets bg-white">
      <Link href={`${pathname}/blog/${slug}`}>
        <div className="w-full grid grid-cols-12 gap-5">
          <div className="col-span-4">
            <MediaItem data={media} aspectRatio={aspectRatio} />
          </div>
          <div className="col-span-8 flex flex-col gap-y-2 py-4 pr-4">
            <div className="text-xs text-primary-600 uppercase tracking-widest flex flex-wrap gap-x-5 gap-y-1">
              {topics && topics.length > 0 && topics.map((topic, idx) => (
                <Link
                  key={idx}
                  className="underline-hover-effect"
                  href={`${pathname}/blog?topic=${topic}`}
                >
                  {topic}
                </Link>
              ))}
            </div>
            <h4 className="lg:text-lg font-semibold mt-1 hover:text-primary-600 transition-colors duration-500">
              {title}
            </h4>
          </div>
        </div>
      </Link>
    </div>
  )
}