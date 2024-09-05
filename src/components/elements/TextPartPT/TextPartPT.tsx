import classNames from "classnames";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { TextAlignmentType, FlexibleContentType } from "@/helpers/types";
import { MarkdownRenderer } from "@/components/elements/MarkdownRenderer/MarkdownRenderer";

export const TextPartPT: React.FC<{
  data: FlexibleContentType;
  alignment?: TextAlignmentType;
  darkMode: boolean;
}> = ({ data, alignment, darkMode }) => {
  const { displayTitle, eyebrow, description, buttons } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "text-sm font-medium tracking-widest",
            { "text-neutral-500": !darkMode },
            { "text-neutral-200": darkMode },
          )}
        >
          {eyebrow}
        </div>
      )}
      {displayTitle && (
        <div className={classNames("mt-1 text-2xl xl:text-3xl max-w-4xl",
          { "text-neutral-50": darkMode },
        )}>
          <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
        </div>
      )}
      {description && (
        <div className={classNames("mt-4 prose xl:prose-lg",
          { "text-neutral-100": darkMode },
        )}>
          <MarkdownRenderer>{description}</MarkdownRenderer>
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <div className="mt-4">
          <ButtonGroup data={buttons} alignment={alignment} />
        </div>
      )}
    </>
  )
}