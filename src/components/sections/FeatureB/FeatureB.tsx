import Section from "@/components/elements/Section/Section"
import Image from "next/image"
import classNames from "classnames"
import Button from "@/components/elements/Button/Button"
import { FeatureType } from "@/utils/types"
import RichText from "@/components/elements/RichText/RichText"

interface FeatureProps {
  data: FeatureType
}

// @TODO refactor to decrease complexity to 10
// eslint-disable-next-line complexity
const FeatureB: React.FC<FeatureProps> = ({ data }) => {
  const { title, label, heading, content, media, buttons, layout } = data

  return (
    <Section>
      <div className={classNames("w-full flex flex-wrap",
        { "flex-col": layout === "Column [ Image | Text ]"},
        { "flex-col-reverse": layout === "Column [ Text | Image ]"},
        { "flex-row-reverse": layout === "Row [ Text | Image ]" },
      )}>
        <div className={classNames(
          "max-w-5xl mx-auto",
          { "w-full lg:w-6/12": layout === "Row [ Text | Image ]" || layout === "Row [ Image | Text ]" }
        )}>
          <div className={classNames("w-full",
            { "aspect-video": layout === "Column [ Text | Image ]" || layout === "Column [ Image | Text ]" }
          )}>
            {media?.contentType.includes("image") && (
              <Image
                className="w-full h-full object-cover"
                src={media?.url ?? ""}
                alt={media.title ?? title}
                width={media.width}
                height={media.height}
              />
            )}
            {media?.contentType.includes("video") && (
              <video className="w-full h-96" src={media?.url}>
                <track kind="captions" label={media.title} />
              </video>
            )}
          </div>
        </div>
        <div className={classNames(
          "pt-5 pb-20 md:py-8 lg:py-12 flex flex-col",
          { "lg:w-6/12 md:pr-8 lg:pr-16": layout === "Row [ Text | Image ]"},
          { "lg:w-6/12 md:pl-8 lg:pl-16": layout === "Row [ Image | Text ]"},
        )}>
          {label && (
            <p className={classNames("uppercase tracking-widest mb-5 text-secondary-500 font-semibold",
              { "text-center": layout === "Column [ Text | Image ]" || layout === "Column [ Image | Text ]"}
            )}>
              {label}
            </p>
          )}
          <h2 className={classNames("font-heading text-3xl md:text-3xl lg:text-5xl leading-snug lg:leading-snug font-bold max-w-3xl mb-5",
            { "text-center mx-auto": layout === "Column [ Text | Image ]" || layout === "Column [ Image | Text ]"}
          )}>
            <RichText htmlString={heading} />
          </h2>
          <div className={classNames("block prose lg:prose-lg max-w-5xl",
            { "mx-auto": layout === "Column [ Text | Image ]" || layout === "Column [ Image | Text ]"}
          )}>
            { content && <RichText htmlString={content} /> }
          </div>
          <div className="mt-10">
            {buttons && buttons.map(button => 
              <Button key={button.text} variant={button.type} url={button.url} size="lg">
                {button.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}

export default FeatureB