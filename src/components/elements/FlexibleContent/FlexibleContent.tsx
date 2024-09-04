import classNames from "classnames";
import { useContext } from "react";
import { TextAlignmentType, FlexibleContentType } from "@/helpers/types";
import { RichTextRenderer } from "@/components/elements/RichTextRenderer/RichTextRenderer";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { DarkModeContext } from "@/components/sections/Gallery/Gallery";
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
            { "text-white": darkMode }
          )}
        >
          <RichTextRenderer content={heading} />
        </div>
      )}
      {description && (
        <div
          className={classNames(
            "prose 2xl:prose-lg leading-loose",
            {
              "mb-4 lg:mb-6": buttons.length > 0,
            },
            { "text-white/70": darkMode },
            { "text-slate-500": !darkMode },
          )}
        >
          <RichTextRenderer content={description} />
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
        {(heading || eyebrow || description || buttons?.length) && (
          <div
            className={classNames(
              "basis-7/12 flex-1 pl-4 xl:pl-6 flex flex-col",
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
      {(heading || eyebrow || description || buttons?.length) && (
        <div
          className={classNames(
            "py-4 xl:pt-6 flex-1 flex flex-col",
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
