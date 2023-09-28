import classNames from "classnames"
import Image from "next/image"
import Button from "../Button/Button"
import { FeatureType } from "@/utils/types"
import RichText from "../RichText/RichText"

interface Props {
  data: FeatureType
}

const FeaturePreview: React.FC<Props> = ({
  data,
}) => {
  const { contentType, title, summary, content, media, buttons } = data
  return (
    <div>
      {media?.url && (
        <Image 
          className={classNames(
            { "aspect-3/2 object-cover w-full": (media.width >= 160)},
            { "w-20 object-contain": (media.width < 160)},
          )}
          src={media.url}
          width={media.width} 
          height={media.height} 
          alt={media.title ?? title}
        />
      )}
      <div className={classNames(
        "pt-5 flex flex-col grow",
      )}>
        <h4 className="text-lg lg:text-xl font-semibold mt-1">
          {title}
        </h4>
        {summary && 
          <p className="text-slate-700 lg:text-lg mt-2">
            {summary}
          </p>
        }
        {contentType === "feature" && content && 
          <div className="text-slate-700 lg:text-lg mt-2 prose lg:prose-lg">
            <RichText htmlString={content} />
          </div>
        }
        {buttons && (
          <div className="mt-auto">
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

export default FeaturePreview