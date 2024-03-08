"use client"
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
        "flex flex-col items-center gap-3 p-4 rounded-assets",
        { "perspective-2500 backface-hidden -rotate-y-90": !isIntersecting },
        { "perspective-none backface-hidden rotate-y-0 transition-transform ease duration-1000 " : isIntersecting },
      )}
      style={{ 
        transitionDelay: `${(index + 1) * 0.2}s`
      }}  
    >
      <div className="font-heading text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-primary-600 text-center">
        {number}
      </div>
      <div className="text-neutral-500 font-heading font-semibold tracking-wide text-center md:text-lg xl:text-xl max-w-[150px]">
        {text}
      </div>
    </div>
  )
}