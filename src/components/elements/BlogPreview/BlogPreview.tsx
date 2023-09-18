import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import { BlogType } from "@/utils/types"
import { usePathname } from "next/navigation"

interface Props {
  data: BlogType
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
  shadow?: boolean
  border?: boolean
  rounded?: boolean
  thumbnailImagePosition?: "top" | "overlay"
  textAlign?: "left" | "right" | "center"
}

const Card: React.FC<Props> = ({
  data,
  aspectRatio = "4/3",
  shadow,
  border,
  rounded,
  thumbnailImagePosition = "top",
  textAlign = "left"
}) => {
  const { title, summary, slug, media, categories } = data
  const pathname = usePathname()
  console.log("Pathname: " + pathname)
  return (
    <div className={classNames(
      "basis-[80%] md:basis-[40%] lg:basis-[30%] px-4 shrink-0 grow",
      { "shadow-lg": shadow },
      { "border": border },
      { "rounded-2xl": rounded },
    )}>
      <Link href={`${pathname}/blog/${slug}`}>
        {media?.url && (
          <Image 
            className={classNames(
              { "aspect-video" : aspectRatio === "video"},
              { "aspect-square" : aspectRatio === "square"},
              { "aspect-3/4" : aspectRatio === "3/4"},
              { "aspect-4/3" : aspectRatio === "4/3"},
              { "aspect-3/2" : aspectRatio === "3/2"},
              { "rounded-t-2xl": rounded && thumbnailImagePosition === "top"},
              { "rounded-2xl": rounded && thumbnailImagePosition === "overlay" },
              "w-full object-cover",
            )}
            src={media.url}
            width={500} 
            height={500} 
            alt={media.title ?? title}
          />
        )}
        <div className={classNames(
          "w-full py-5",
          { "px-5": border || rounded },
          { "absolute bottom-0 bg-gradient-to-t from-gray-900/90 to-transparent text-white": data.media?.url && thumbnailImagePosition === "overlay" },
          { "rounded-b-2xl": rounded },
          { "text-center": textAlign === "center" },
          { "text-right": textAlign === "right" }
        )}>
          <p className="text-xs uppercase tracking-widest">
            {categories && categories.length > 0 && categories.map(item => item.title)}
          </p>
          <h4 className="text-lg lg:text-xl font-semibold mt-1">
            {title}
          </h4>
          {summary && 
            <p className="text-slate-700 lg:text-lg mt-2 line-clamp-3">
              {summary}
            </p>
          }
        </div>
      </Link>
    </div>
  )
}

export default Card