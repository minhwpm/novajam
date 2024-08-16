import classNames from "classnames";
import { useContext } from "react";
import { TextAlignmentType, FlexibleContentType } from "@/lib/types";
import { RichText } from "@/components/elements/RichText/RichText";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import { useInView } from "react-hook-inview";

const TextPart: React.FC<{
  data: FlexibleContentType;
  alignment?: TextAlignmentType;
  darkMode?: boolean
}> = ({ data, alignment, darkMode }) => {
  const { heading, eyebrow, description, buttons } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "not-prose text-xs xl:text-sm font-medium tracking-widest mb-1",
            { "text-neutral-400": !darkMode },
            { "text-neutral-100": darkMode }
          )}
        >
          {eyebrow}
        </div>
      )}
      {heading && (
        <div
          className={classNames(
            "not-prose font-heading text-lg lg:text-xl",
            { "mb-2 lg:mb-4": description || buttons.length > 0 },
            { "text-neutral-50": darkMode }
          )}
        >
          <RichText data={heading} />
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
          <RichText data={description} />
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <ButtonGroup data={buttons} alignment={alignment} />
      )}
    </>
  );
};

export const FlexibleContent: React.FC<{
  data: FlexibleContentType;
  alignment?: TextAlignmentType;
  layout?: "vertical" | "horizontal";
  animate?: boolean;
}> = ({ data, alignment = "center", layout = "vertical", animate }) => {
  const { heading, eyebrow, description, media, embeddedMediaUrl, buttons } =
    data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  const darkMode = useContext(DarkModeContext);
  if (layout === "horizontal") {
    return (
      <div
        ref={ref}
        className={classNames(
          "flex rounded-theme",
          { "relative -bottom-10 opacity-0": animate },
          {
            "animate-slidingUpContent animation-delay-150":
              isIntersecting && animate,
          }
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
            <TextPart data={data} alignment={alignment} darkMode={darkMode} />
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={classNames(
        "flex flex-col rounded-theme",
        { "relative -bottom-10 opacity-0": animate },
        {
          "animate-slidingUpContent animation-delay-150":
            isIntersecting && animate,
        }
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
            "py-4 flex-1 flex flex-col",
            {"text-neutral-100": darkMode},
            { "text-center": alignment === "center" },
            { "text-end": alignment === "end" }
          )}
        >
          <TextPart data={data} alignment={alignment} darkMode={darkMode} />
        </div>
      )}
    </div>
  );
};
