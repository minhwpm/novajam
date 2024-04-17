import { useInView } from "react-hook-inview";
import classNames from "classnames";
import { RichText } from "@/components/elements/RichText/RichText"
import { TextAlignmentType, ContentPieceType } from "@/helpers/types";

// @TODO remove this file as it isn't used in anywhere
interface Props {
  data: ContentPieceType
  idx: number
  setVisibleIdx: (idx: number) => void
  alignment: TextAlignmentType
}

export const FeatureContentItem = ({ data, idx, setVisibleIdx, alignment }: Props) => {
  const { eyebrow, heading, description } = data
  const [ref, isVisible] = useInView(
    {
      threshold: 0.9,
      onEnter: () => setVisibleIdx(idx)
    },
  )
  return (
    <div
      ref={ref}
      className={classNames(
        "py-[20vh] px-10 transition-opacity duration-300 flex flex-col",
        { "is-visible opacity-100": isVisible },
        { "is-invisible opacity-10": !isVisible },
        { "text-center": alignment === "center" },
        { "text-end": alignment === "end" }
      )}
    >
      {eyebrow && (
        <div
          className={classNames(
            "tracking-widest px-4 py-1 text-sm font-medium text-primary-600 bg-primary-100 rounded-assets self-start"
          )}
        >
          {eyebrow}
        </div>
      )}
      {heading && (
        <div
          className={classNames("text-2xl lg:text-3xl font-semibold", {
            "mt-2": eyebrow,
          })}
        >
          <RichText data={heading} />
        </div>
      )}
      {description && (
        <div className="prose 2xl:prose-lg mt-6">
          <RichText data={description} />
        </div>
      )}
    </div>
  );
}