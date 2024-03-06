"use client"
import classNames from "classnames"
import Link from "next/link"
import { BlogType, MediaAspectRatioType } from "@/helpers/types"
import { usePathname } from "next/navigation"
import { MediaItem } from "../MediaItem/MediaItem"

export const BlogPreview: React.FC<{
  data: BlogType
  aspectRatio?: MediaAspectRatioType
  layout?: "vertical" | "horizontal"
}> = ({
  data,
  aspectRatio = "3/2",
  layout = "vertical"
}) => {
  const { title, slug, media, topics } = data
  const pathname = usePathname()
  if (layout === "horizontal") {
    return (
      <div className="rounded-assets bg-neutral-50 flex gap-5">
        <div className="basis-1/3 flex-1">
          <Link href={`${pathname}/blog/${slug}`}>
            <MediaItem data={media} aspectRatio={aspectRatio} />
          </Link>
        </div>
        <div className="basis-2/3 flex-1 flex flex-col gap-y-2 py-4 pr-4">
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
          <h4 className="font-heading lg:text-lg font-semibold mt-1 hover:text-primary-600 transition-colors duration-500">
            <Link href={`${pathname}/blog/${slug}`}>
              {title}
            </Link>
          </h4>
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-assets bg-neutral-50">
      <Link href={`${pathname}/blog/${slug}`}>
        <MediaItem data={media} aspectRatio={aspectRatio} />
      </Link>
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
        <h4 className="font-heading text-lg font-semibold mt-1 hover:text-primary-600 transition-colors duration-500">
          <Link href={`${pathname}/blog/${slug}`}>
            {title}
          </Link>
        </h4>
      </div>
    </div>
  )
}