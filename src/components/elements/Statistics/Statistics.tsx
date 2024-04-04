"use client"
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import { AlignmentType, StatisticsType } from "@/helpers/types"
import { useContext } from "react";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";

  
export const Statistics: React.FC<{
  data: StatisticsType;
  index: number;
  alignment?: AlignmentType;
}> = ({ data, index, alignment }) => {
  const { number, text } = data;
  const darkMode = useContext(DarkModeContext);
  const [ref, isIntersecting] = useInView({
    threshold: 1,
    unobserveOnEnter: true,
  });

  return (
    <div
      ref={ref}
      className={classNames(
        "flex flex-col items-center gap-3 p-4 lg:p-6 bg-white rounded-assets",
        { "perspective-2500 backface-hidden -rotate-y-90": !isIntersecting },
        {
          "perspective-none backface-hidden rotate-y-0 transition-transform ease duration-1000 ":
            isIntersecting,
        },
        { "bg-opacity-5": darkMode }
      )}
      style={{
        transitionDelay: `${(index + 1) * 0.2}s`,
      }}
    >
      <div
        className={classNames(
          "font-heading text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-semibold tracking-wide",
          { "text-primary-600": !darkMode },
          { "text-neutral-200": darkMode },
          { "text-center": alignment === "center" },
          { "text-end": alignment === "end" }
        )}
      >
        {number}
      </div>
      <div
        className={classNames(
          "font-heading font-semibold tracking-wide md:text-lg xl:text-xl max-w-[150px]",
          { "text-neutral-600": !darkMode },
          { "text-neutral-300": darkMode },
          { "text-center": alignment === "center" },
          { "text-end": alignment === "end" }
        )}
      >
        {text}
      </div>
    </div>
  );
};