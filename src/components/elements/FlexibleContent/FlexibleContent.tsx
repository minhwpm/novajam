import classNames from "classnames";
import { AlignmentType, ContentPieceType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2"
import { ButtonGroup } from "../ButtonGroup/ButtonGroup";
import { FlexibleContentMediaPart } from "../FlexibleContentMediaPart/FlexibleContentMediaPart";

const TextPart: React.FC<{
  data: ContentPieceType;
  alignment?: AlignmentType
}> = ({ data, alignment }) => {
  const { heading, label, description, buttons } = data;
  return (
    <>
      {label && (
        <div className={classNames("text-sm font-semibold text-neutral-500 tracking-widest mb-2")}>
          {label}
        </div>
      )}
      {heading && (
        <div className={classNames("text-lg lg:text-2xl", {"mb-4": !description})}>
          <RichText2 data={heading} />
        </div>
      )}
      {description && (
        <div className={classNames("py-4 prose 2xl:prose-lg", {"mb-2": buttons.length > 0})}>
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
}> = ({
  data, alignment = 'center'
}) => {
  const { heading, label, description, media, embeddedMediaUrl, buttons } = data;
  return (
    <div className="flex flex-col rounded-assets bg-white">
      {(media || embeddedMediaUrl) && <FlexibleContentMediaPart data={data} alignment={alignment} aspectRatio="auto" /> }
      {(heading || label || description || buttons?.length > 0) && (
        <div
          className={classNames(
            "px-4 pt-4 pb-6 lg:px-6 lg:pt-6 lg:pb-8 flex-1 flex flex-col justify-between",
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
