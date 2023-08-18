import { useInView } from "react-hook-inview";
import classNames from "classnames";
import RichText from "../RichText/RichText";

interface Props {
  section: {
    title: string
    content: string
  }
  idx: number
  setVisibleIdx: (idx: number) => void
}

const FeatureContentItem = ({ section, idx, setVisibleIdx }: Props) => {
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
      { "is-invisible opacity-10": !isVisible}
    )}>
      <h3 className="text-4xl font-semibold mb-8">
        {section.title}
      </h3>
      <div className="text-xl text-slate-600">
        <RichText htmlString={section.content} />
      </div>
    </div>
  )
}

export default FeatureContentItem