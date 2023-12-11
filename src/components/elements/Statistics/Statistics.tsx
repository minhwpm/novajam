'use client'
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import { StatisticsType } from "@/helpers/types"

export const Statistics: React.FC<{ data: StatisticsType, index: number }> = ({ data, index }) => {
  const { number, text } = data
  const [ref, isIntersecting] = useInView({
    threshold: 1,
    unobserveOnEnter: true
  });

  return (
    <div 
      ref={ref}
      className={classNames(
        "flex flex-col items-center gap-3 pt-6 py-10 px-4 bg-white rounded-assets",
        { "perspective-2500 backface-hidden -rotate-y-90": !isIntersecting },
        { "perspective-none backface-hidden rotate-y-0 transition-transform ease duration-1000 " : isIntersecting },
      )}
      style={{ 
        transitionDelay: `${(index + 1) * 0.2}s`
      }}  
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-600 text-center tracking-tighter">
        {number}
      </div>
      <div className="font-semibold tracking-wide text-center text-neutral-600 max-w-[150px]">
        {text}
      </div>
    </div>
  )
}