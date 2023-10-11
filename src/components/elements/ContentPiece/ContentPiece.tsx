import { ContentPieceType } from "@/utils/types"
import classNames from "classnames"
import RichText from "../RichText/RichText"
import Button from "../Button/Button"
import { MediaCarousel } from "../MediaCarousel/MediaCarousel"

export const ContentPiece: React.FC<{ data: ContentPieceType }> = ({ data }) => {
  const { title, content, media, ctaButton, alignment } = data
  return (
    <div className="flex flex-col">
      <div className={classNames(
        { "flex justify-center": alignment === "center"}
      )}>
        { media.length > 0 && <MediaCarousel data={media} /> }
      </div>
      <div className={classNames(
        "py-5 pr-5 flex-1 flex flex-col justify-between",
      )}>
        <div className={classNames(
          { "text-center": alignment === "center" }
        )}>
          <h4 className="text-lg lg:text-2xl font-semibold mt-1">
            {title}
          </h4>
          <div className="py-3 prose lg:prose-lg">
            <RichText htmlString={content} />
          </div>
        </div>
        {ctaButton && (
          <div className={classNames(
            "mt-8",
            { "flex justify-center": alignment === "center" }
          )}>
            <Button key={ctaButton.text} url={ctaButton.url}>
              {ctaButton.text}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}