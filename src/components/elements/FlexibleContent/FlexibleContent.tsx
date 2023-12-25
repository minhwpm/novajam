import { AlignmentType, ContentPieceType } from "@/helpers/types";
import classNames from "classnames";
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
        <div className={classNames("text-sm font-semibold text-neutral-500 tracking-widest")}>
          {label}
        </div>
      )}
      {heading && (
        <div className="text-lg lg:text-2xl mt-1">
          <RichText2 data={heading} />
        </div>
      )}
      {description && (
        <div className="py-3 prose lg:prose-lg">
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
      {(media || embeddedMediaUrl) && <FlexibleContentMediaPart data={data} alignment={alignment} /> }
      {(heading || label || description || buttons?.length > 0) && (
        <div
          className={classNames(
            "px-6 py-8 flex-1 flex flex-col gap-y-4 justify-between",
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
