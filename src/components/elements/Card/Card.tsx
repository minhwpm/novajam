import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
interface CardProps {
  data: {
    label?: string
    title: string
    content?: string
    media?: {
      type: string
      src: string
      altText?: string
    }
    url?: string
  }
  // size?: "small" | "medium" | "large"
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
  shadow?: boolean
  border?: boolean
  rounded?: boolean
  mediaPosition?: "top" | "overlay"
  textAlign?: "left" | "right" | "center"
}

const Card: React.FC<CardProps> = ({
  data,
  // size = "medium",
  aspectRatio = "video",
  shadow,
  border,
  rounded,
  mediaPosition = "top",
  textAlign = "left"
}) => {
  const { label, title, content, url } = data
  return (
    <div className={classNames(
      "relative flex flex-col shrink-0 bg-white",
      // { "max-w-[250px]" : size === "small"},
      // { "max-w-xs" : size === "medium"},
      // { "max-w-xs md:max-w-sm lg:max-w-md" : size === "large"},
      { "shadow-lg": shadow },
      { "border": border },
      { "rounded-2xl": rounded },
    )}>
      {data.media?.type === "image" && data.media?.src && (
        <Image 
          className={classNames(
            { "aspect-video" : aspectRatio === "video"},
            { "aspect-3/4" : aspectRatio === "3/4"},
            { "aspect-4/3" : aspectRatio === "4/3"},
            { "aspect-3/2" : aspectRatio === "3/2"},
            { "rounded-t-2xl": rounded && mediaPosition === "top"},
            { "rounded-2xl": rounded && mediaPosition === "overlay" },
            "object-cover",
          )}
          src={data.media.src}
          width={500} 
          height={500} 
          alt={data.media.altText ?? title}
        />
      )}
      <div className={classNames(
        "w-full p-5",
        // {"px-4 py-3": size === "small"},
        // {"px-6 py-5": size === "medium"},
        // { "px-8 pb-6 pt-5": size === "large"},
        { "absolute bottom-0 bg-gradient-to-t from-gray-900/90 to-transparent text-white": data.media?.src && mediaPosition === "overlay" },
        { "rounded-b-2xl": rounded },
        { "text-center": textAlign === "center" },
        { "text-right": textAlign === "right" }
      )}>
        <p className="text-sm uppercase tracking-widest mb-3">
          {label}
        </p>
        <h4 className="text-2xl font-semibold mb-3">
          {url ? (
            <Link href={url}>
              {title}
            </Link>
          ) : (<>{title}</>)}
        </h4>
        <p className="text-slate-600">
          {content}
        </p>
      </div>
    </div>
  )
}

export default Card