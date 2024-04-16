import classNames from "classnames";
import { useContext } from "react";
import { TextAlignmentType, ContentPieceType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";

const TextPart: React.FC<{
  data: ContentPieceType;
  alignment?: TextAlignmentType;
}> = ({ data, alignment }) => {
  const darkMode = useContext(DarkModeContext);
  const { heading, eyebrow, description, buttons } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "text-xs font-medium tracking-widest mb-1",
            { "text-neutral-500": !darkMode },
            { "text-neutral-100": darkMode }
          )}
        >
          {eyebrow}
        </div>
      )}
      {heading && (
        <div
          className={classNames(
            "font-heading text-lg lg:text-xl",
            { "mb-2 lg:mb-4": description || buttons.length > 0 },
            { "text-neutral-50": darkMode }
          )}
        >
          <RichText2 data={heading} />
        </div>
      )}
      {description && (
        <div
          className={classNames(
            "prose 2xl:prose-lg",
            {
              "mb-4 lg:mb-6": buttons.length > 0,
            },
            { "text-neutral-600": !darkMode },
            { "text-neutral-100": darkMode }
          )}
        >
          <RichText2 data={description} />
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <ButtonGroup data={buttons} alignment={alignment} />
      )}
    </>
  );
};

export const FlexibleContent: React.FC<{
  data: ContentPieceType;
  alignment?: TextAlignmentType;
  layout?: "vertical" | "horizontal";
}> = ({ data, alignment = "center", layout = "vertical" }) => {
  const { heading, eyebrow, description, media, embeddedMediaUrl, buttons } =
    data;
  if (layout === "horizontal") {
    return (
      <div
        className={classNames(
          "flex rounded-assets",
        )}
      >
        <div className="max-w-fit basis-5/12">
          {(media || embeddedMediaUrl) && (
            <FlexibleContentMediaPart
              data={data}
              alignment={alignment}
              aspectRatio="auto"
            />
          )}
        </div>
        {(heading || eyebrow || description || buttons?.length > 0) && (
          <div
            className={classNames(
              "basis-7/12 flex-1 px-4 flex flex-col",
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" }
            )}
          >
            <TextPart data={data} alignment={alignment} />
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={classNames(
        "flex flex-col rounded-assets",
      )}
    >
      {(media || embeddedMediaUrl) && (
        <FlexibleContentMediaPart
          data={data}
          alignment={alignment}
          aspectRatio="auto"
        />
      )}
      {(heading || eyebrow || description || buttons?.length > 0) && (
        <div
          className={classNames(
            "pt-4 flex-1 flex flex-col",
            { "text-center": alignment === "center" },
            { "text-end": alignment === "end" }
          )}
        >
          <TextPart data={data} alignment={alignment} />
        </div>
      )}
    </div>
  );
};
