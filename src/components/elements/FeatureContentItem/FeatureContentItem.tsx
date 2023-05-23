import { useInView } from "react-hook-inview";
import classNames from "classnames";

const FeatureContentItem = ({ section, idx, setVisibleIdx }) => {
  const [ref, isVisible] = useInView(
    {
      threshold: 0.9,
      onEnter: () => setVisibleIdx(idx)
    },
  )
  return (
    <div ref={ref} className={classNames(
      "content-wrapper py-[20vh] px-10 transition-opacity duration-300",
      { "is-visible opacity-100": isVisible },
      { "is-invisible opacity-10": !isVisible}
    )}>
      <h3 className="text-4xl font-semibold mb-8">
        {section.content.title}
      </h3>
      <p className="text-xl">
      {section.content.description}
      </p>
    </div>
  )
}

export default FeatureContentItem