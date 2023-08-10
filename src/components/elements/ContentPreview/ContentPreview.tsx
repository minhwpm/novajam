import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import Button from "../Button/Button"
import { ButtonVariant } from "@/utils/types"

interface ContentPreviewProps {
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
    button?: {
      url: string
      text: string
      type: ButtonVariant
    }
  }
  // size?: "small" | "medium" | "large"
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
  shadow?: boolean
  border?: boolean
  rounded?: boolean
  mediaPosition?: "top" | "overlay"
  textAlign?: "left" | "right" | "center"
}

const Card: React.FC<ContentPreviewProps> = ({
  data,
  // size = "medium",
  aspectRatio = "video",
  shadow,
  border,
  rounded,
  mediaPosition = "top",
  textAlign = "left"
}) => {
  const { label, title, content, url, button } = data
  return (
    <div className={classNames(
      "relative flex flex-col shrink-0",
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
            { "aspect-square" : aspectRatio === "square"},
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
      {data.media?.type === "icon" && data.media?.src && (
        <Image
          className="w-16 h-16"
          src={data.media.src}
          width={64}
          height={64}
          alt={data.media.altText ?? title}
        />
      )}
      <div className={classNames(
        "w-full py-5",
        { "px-5": border || rounded },
        { "absolute bottom-0 bg-gradient-to-t from-gray-900/90 to-transparent text-white": data.media?.src && mediaPosition === "overlay" },
        { "rounded-b-2xl": rounded },
        { "text-center": textAlign === "center" },
        { "text-right": textAlign === "right" }
      )}>
        <p className="text-xs uppercase tracking-widest">
          {label}
        </p>
        <h4 className="text-lg lg:text-xl font-semibold mt-1">
          {url ? (
            <Link href={url}>
              {title}
            </Link>
          ) : (<>{title}</>)}
        </h4>
        <p className="text-slate-600 lg:text-lg block mt-2">
          {content}
        </p>
        {button?.url && (
          <div className="mt-6">
            <Button variant={button.type ?? "outline"} url={button.url}>
              {button.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Card