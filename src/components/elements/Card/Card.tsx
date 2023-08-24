import classNames from "classnames"
import Image from "next/image"
import Link from "next/link"
import Button from "../Button/Button"
import { ButtonVariant } from "@/utils/types"
import RichText from "../RichText/RichText"

interface CardProps {
  data: {
    id: string
    title: string
    url?: string
    summary?: string
    content?: string
    tags?: Array<string>
    media?: {
      contentType: string
      url: string
      title?: string
    }
    buttons?: Array<{
      url: string
      text: string
      type?: ButtonVariant
    }>
  }
  aspectRatio?: "video" | "square" | "3/4" | "4/3" | "3/2"
  shadow?: boolean
  border?: boolean
  rounded?: boolean
  thumbnailImagePosition?: "top" | "overlay"
  textAlign?: "left" | "right" | "center"
}

const Card: React.FC<CardProps> = ({
  data,
  aspectRatio = "video",
  shadow,
  border,
  rounded,
  thumbnailImagePosition = "top",
  textAlign = "left"
}) => {
  const { tags, title, summary, content, url, media, buttons } = data
  return (
    <div className={classNames(
      "w-1/3 basis-[30%] px-4 shrink-0 grow",
      { "shadow-lg": shadow },
      { "border": border },
      { "rounded-2xl": rounded },
    )}>
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
          {tags}
        </p>
        <h4 className="text-lg lg:text-xl font-semibold mt-1">
          {url ? (
            <Link href={`${url}`}>
              {title}
            </Link>
          ) : (<>{title}</>)}
        </h4>
        {summary && 
          <p className="text-slate-600 lg:text-lg block mt-2">
            {summary}
          </p>
        }
        {content && 
          <div className="text-slate-600 lg:text-lg block mt-2">
            <RichText htmlString={content} />
          </div>
        }
        {buttons && (
          <div className="mt-6">
            {buttons.map(button => (
              <Button key={button.text} variant={button.type ?? "alternate"} url={button.url}>
                {button.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Card