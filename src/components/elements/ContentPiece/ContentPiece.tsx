import { ContentPieceType } from "@/utils/types"
import classNames from "classnames"
import Image from "next/image"
import RichText from "../RichText/RichText"
import Button from "../Button/Button"

export const ContentPiece: React.FC<{ data: ContentPieceType }> = ({ data }) => {
  const { title, content, media, ctaButton } = data
  return (
    <div className="flex flex-col">
      <div>
        {media.length > 0 && media.map(item => (
          <Image
            key={item.id}
            className={classNames(
              { "aspect-3/2 object-cover w-full": (item.width >= 160)},
              { "w-20 object-contain": (item.width < 160)},
            )}
            src={item.url}
            width={item.width} 
            height={item.height} 
            alt={item.title ?? title}
          />
        ))}
      </div>
      <div className={classNames(
        "py-5 pr-5 flex-1 flex flex-col justify-between",
      )}>
        <div>
          <h4 className="text-lg lg:text-2xl font-semibold mt-1">
            {title}
          </h4>
          <div className="py-3 prose lg:prose-lg">
            <RichText htmlString={content} />
          </div>
        </div>
        {ctaButton && (
          <div className="mt-8">
            <Button key={ctaButton.text} url={ctaButton.url}>
              {ctaButton.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}