import classNames from "classnames";
import { useContext } from "react";
import { TextAlignmentType, FlexibleContentType } from "@/helpers/types";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { DarkModeContext } from "@/components/sections/Gallery/Gallery";
import { useInView } from "react-hook-inview";
import { MarkdownRenderer } from "@/components/elements/MarkdownRenderer/MarkdownRenderer";

export const FlexibleContent: React.FC<{
  index?: number;
  data: FlexibleContentType;
  alignment?: TextAlignmentType;
  layout?: "vertical" | "horizontal";
  animate?: boolean;
}> = ({ index, data, alignment = "center", layout = "vertical", animate }) => {
  const {
    displayTitle,
    eyebrow,
    description,
    media,
    embeddedMediaUrl,
    buttons,
  } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  const darkMode = useContext(DarkModeContext);
  if (layout === "horizontal") {
    return (
      <div
        ref={ref}
        className={classNames("flex rounded-theme", {
          "relative -bottom-10 opacity-0": animate,
          "animate-slidingUpContent": isIntersecting && animate,
        })}
        style={{
          animationDelay: (index && animate) ? `${(index + 1) * 0.15}s` : "0s",
        }}
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
        {(displayTitle || eyebrow || description || !!buttons?.length) && (
          <div
            className={classNames(
              "basis-7/12 flex-1 pl-4 xl:pl-6 flex flex-col",
              {
                "text-center": alignment === "center",
                "text-end": alignment === "end",
              }
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
      className={classNames("flex flex-col rounded-theme h-full", {
        "relative -bottom-10 opacity-0": animate,
        "animate-slidingUpContent": isIntersecting && animate,
      })}
      style={{
        animationDelay: (index && animate) ? `${(index + 1) * 0.15}s` : "0s",
      }}
    >
      {(media || embeddedMediaUrl) && (
        <FlexibleContentMediaPart
          className={classNames({
            "grow items-center": !(
              displayTitle ||
              eyebrow ||
              description ||
              !!buttons?.length
            ),
          })}
          data={data}
          alignment={alignment}
          aspectRatio="auto"
        />
      )}
      {(displayTitle || eyebrow || description || !!buttons?.length) && (
        <div
          className={classNames("py-4 xl:pt-6 flex-1 flex flex-col", {
            "text-center": alignment === "center",
            "text-end": alignment === "end",
          })}
        >
          <TextPart data={data} alignment={alignment} darkMode={darkMode} />
        </div>
      )}
    </div>
  );
};

const TextPart: React.FC<{
  data: FlexibleContentType;
  alignment?: TextAlignmentType;
  darkMode?: boolean;
}> = ({ data, alignment, darkMode }) => {
  const { eyebrow, displayTitle, description, buttons } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "not-prose text-xs xl:text-sm font-medium tracking-widest mb-1 text-slate-400 dark:text-slate-100/60"
          )}
        >
          {eyebrow}
        </div>
      )}
      {displayTitle && (
        <div
          className={classNames("not-prose font-heading text-lg lg:text-xl", {
            "mb-2 lg:mb-4": description || buttons.length > 0,
            "text-slate-100": darkMode,
          })}
        >
          <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
        </div>
      )}
      {description && (
        <div
          className={classNames(
            "prose 2xl:prose-lg leading-loose text-slate-500 dark:text-slate-100/70",
            {
              "mb-4 lg:mb-6": buttons.length > 0,
            }
          )}
        >
          <MarkdownRenderer>{description}</MarkdownRenderer>
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <ButtonGroup data={buttons} alignment={alignment} />
      )}
    </>
  );
};
