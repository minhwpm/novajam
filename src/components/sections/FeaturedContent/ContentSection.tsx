import classNames from "classnames";
import { MarkdownRenderer } from "@/components/elements/MarkdownRenderer/MarkdownRenderer";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { FlexibleContent } from "@/components/elements/FlexibleContent/FlexibleContent";
import { FlexibleContentType, ButtonType } from "@/helpers/types"

export const ContentSection: React.FC<{
  eyebrow: string | null
  displayTitle: string | null
  description: string | null 
  items: Array<FlexibleContentType>
  buttons: Array<ButtonType>
  mediaPosition: "left" | "right"
  size: "standard" | "extended"
  isIntersecting: boolean
}> = ({
  eyebrow,
  displayTitle,
  description,
  items,
  buttons,
  mediaPosition,
  size,
  isIntersecting,
}) => {
  const hasContent = Boolean(
    eyebrow || displayTitle || description || items.length || buttons.length
  );

  if (!hasContent) return null;

  return (
    <div
      className={classNames("relative -bottom-10 opacity-0 lg:flex-1", {
        "animate-slidingUpContent animation-delay-300": isIntersecting,
        "pt-4 lg:pl-16 xl:pl-24": mediaPosition === "left",
        "custom-padding-right pl-4 py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24":
          size === "extended" && mediaPosition === "left",
        "pb-4 lg:pr-16 xl:pr-24": mediaPosition === "right",
      })}
    >
      {eyebrow && (
        <div className="text-sm xl:text-base tracking-widest mb-2 max-w-5xl text-primary-600 dark:text-primary-600/50">
          {eyebrow}
        </div>
      )}
      {displayTitle && (
        <div className="text-heading leading-snug font-heading max-w-3xl xl:max-w-4xl mb-4 lg:mb-8 dark:text-slate-100">
          <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
        </div>
      )}
      {description && (
        <div
          className={classNames(
            "block prose xl:prose-lg leading-loose text-slate-500 dark:prose-invert dark:text-slate-100/70",
            { "mb-4 lg:mb-8": buttons && buttons.length > 0 }
          )}
        >
          <MarkdownRenderer>{description}</MarkdownRenderer>
        </div>
      )}
      {!!items.length && (
        <div className="flex flex-col gap-y-8 my-8">
          {items.map((item, index) => (
            <FlexibleContent key={index} data={item} layout="horizontal" alignment="start"/>
          ))}
        </div>
      )}
      {buttons?.length > 0 && <ButtonGroup data={buttons} size="lg" />}
    </div>
  );
};
