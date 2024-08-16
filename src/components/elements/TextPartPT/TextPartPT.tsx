import classNames from "classnames";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { TextAlignmentType, FlexibleContentType } from "@/lib/types";
import { RichText } from "@/components/elements/RichText/RichText";

export const TextPartPT: React.FC<{
  data: FlexibleContentType;
  alignment?: TextAlignmentType;
  darkMode: boolean;
}> = ({ data, alignment, darkMode }) => {
  const { heading, eyebrow, description, buttons } = data;
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
      {heading && (
        <div className={classNames("mt-1 text-2xl xl:text-3xl max-w-4xl",
          { "text-neutral-50": darkMode },
        )}>
          <RichText data={heading} />
        </div>
      )}
      {description && (
        <div className={classNames("mt-4 prose xl:prose-lg",
          { "text-neutral-100": darkMode },
        )}>
          <RichText data={description} />
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