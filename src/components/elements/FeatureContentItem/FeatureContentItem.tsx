import { useInView } from "react-hook-inview";
import classNames from "classnames";
import RichText from "../RichText/RichText";
import { AlignmentType, ContentPieceType } from "@/helpers/types";

interface Props {
  data: ContentPieceType
  idx: number
  setVisibleIdx: (idx: number) => void
  alignment: AlignmentType
}

const FeatureContentItem = ({ data, idx, setVisibleIdx, alignment }: Props) => {
  const [ref, isVisible] = useInView(
    {
      threshold: 0.9,
      onEnter: () => setVisibleIdx(idx)
    },
  )
  return (
    <div ref={ref} className={classNames(
      "py-[20vh] px-10 transition-opacity duration-300",
      { "is-visible opacity-100": isVisible },
      { "is-invisible opacity-10": !isVisible},
      { "text-center": alignment === "center" },
      { "text-end": alignment === "reverse" }
    )}>
      <div className="text-2xl lg:text-3xl font-semibold mb-8">
        <RichText htmlString={data.heading} />
      </div>
      <div className="prose lg:prose-lg">
        <RichText htmlString={data.content} />
      </div>
    </div>
  )
}

export default FeatureContentItem