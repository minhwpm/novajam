import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
interface Props {
  data: {
    title: string
    content?: string
    image?: {
      src: string
      altText?: string
    }
    url?: string
  }
  aspectRatio?: "video" | "square" | "4/3" | "3/2"
  shadow?: boolean
  border?: boolean
  rounded?: boolean
  imagePosition?: "top" | "overlay"
}

const Card = ({
  data,
  aspectRatio = "video",
  shadow,
  border,
  rounded,
  imagePosition = "top"
}: Props) => {
  const { title, content, url } = data
  return (
    <div className={classNames(
      "relative flex flex-col justify-center shrink-0 max-w-xs md:max-w-sm lg:max-w-md",
      { "aspect-video" : aspectRatio === "video"},
      { "aspect-4/3" : aspectRatio === "4/3"},
      { "aspect-3/2" : aspectRatio === "3/2"},
      { "shadow-lg": shadow },
      { "border": border },
      { "rounded-2xl": rounded },
    )}>
      {data.image?.src && (
        <Image 
          className={classNames(
            "h-full w-auto object-cover",
            { "rounded-t-2xl": rounded && imagePosition === "top"},
            { "rounded-2xl": rounded && imagePosition === "overlay" },
          )}
          src={data.image.src}
          width={500} 
          height={400} 
          alt={data.image.altText ?? title}
        />
      )}
      <div className={classNames(
        "px-8 pb-6 pt-5 w-full",
        { "absolute bottom-0 bg-gradient-to-t from-gray-900/90 to-transparent text-white": data.image?.src && imagePosition === "overlay" },
        { "rounded-b-2xl": rounded }
      )}>
        <h4 className="text-2xl font-medium mb-3">
          {url ? (
            <Link href={url}>
              {title}
            </Link>
          ) : (<>{title}</>)}
        </h4>
        <p>
          {content}
        </p>
      </div>
    </div>
  )
}

export default Card