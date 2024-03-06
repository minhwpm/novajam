import classNames from "classnames";
import { AlignmentType, ContentPieceType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2"
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { FlexibleContentMediaPart } from "../FlexibleContentMediaPart/FlexibleContentMediaPart";

const TextPart: React.FC<{
  data: ContentPieceType;
  alignment?: AlignmentType
}> = ({ data, alignment }) => {
  const { heading, eyebrow, description, buttons } = data;
  return (
    <>
      {eyebrow && (
        <div className={classNames("text-sm font-semibold text-neutral-500 tracking-widest mb-1")}>
          {eyebrow}
        </div>
      )}
      {heading && (
        <div className={classNames("font-heading text-lg lg:text-2xl", {"mb-2 lg:mb-4": description || buttons.length > 0})}>
          <RichText2 data={heading} />
        </div>
      )}
      {description && (
        <div className={classNames("prose 2xl:prose-lg text-neutral-700", {"mb-4 lg:mb-6": buttons.length > 0})}>
          <RichText2 data={description} />
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <ButtonGroup data={buttons} alignment={alignment} />
      )}
    </>
  )
}

export const FlexibleContent: React.FC<{
  data: ContentPieceType;
  alignment?: AlignmentType
  layout?: "vertical" | "horizontal"
}> = ({
  data, 
  alignment = 'center',
  layout = "vertical",
}) => {
  const { heading, eyebrow, description, media, embeddedMediaUrl, buttons } = data;
  if (layout === "horizontal") {
    return (
      <div className="flex gap-5 rounded-assets bg-white">
        <div className="basis-1/3 flex-1">
          {(media || embeddedMediaUrl) && <FlexibleContentMediaPart data={data} alignment={alignment} aspectRatio="auto" /> }
        </div>
        {(heading || eyebrow || description || buttons?.length > 0) && (
          <div
            className={classNames(
              "basis-2/3 flex-1 px-4 pt-4 pb-6 lg:px-6 lg:pt-6 lg:pb-8 flex flex-col justify-between",
              { "text-center": alignment === "center" },
              { "text-end": alignment === "reverse" }
            )}
          >
            <TextPart data={data} alignment={alignment} />
          </div>
        )}
      </div>
    )
  }
  return (
    <div className="flex flex-col rounded-assets bg-white">
      {(media || embeddedMediaUrl) && <FlexibleContentMediaPart data={data} alignment={alignment} aspectRatio="auto" /> }
      {(heading || eyebrow || description || buttons?.length > 0) && (
        <div
          className={classNames(
            "px-2 lg:px-4 pt-4 pb-8 flex-1 flex flex-col justify-between",
            { "text-center": alignment === "center" },
            { "text-end": alignment === "reverse" }
          )}
        >
          <TextPart data={data} alignment={alignment} />
        </div>
      )}
    </div>
  );
};
