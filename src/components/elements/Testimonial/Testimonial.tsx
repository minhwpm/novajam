"use client"
import classNames from "classnames";
import { TextAlignmentType, TestimonialType } from "@/helpers/types";
import { MediaItem } from "../MediaItem/MediaItem";
import { AiFillStar } from "react-icons/ai";
import { useInView } from "react-hook-inview";
import { useContext } from "react";
import { DarkModeContext } from "@/components/sections/Gallery/Gallery";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { MarkdownRenderer } from "../MarkdownRenderer/MarkdownRenderer";

export const Testimonial: React.FC<{
  data: TestimonialType;
  alignment?: TextAlignmentType;
  animate?: boolean;
}> = ({ data, alignment = "center", animate }) => {
  const { content, portrait, name, role, rating } = data;
  const darkMode = useContext(DarkModeContext);
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  return (
    <div
      ref={ref}
      className={classNames(
        "px-4 flex flex-col rounded-theme",
        { "relative -bottom-10 opacity-0": animate },
        {
          "animate-slidingUpContent animation-delay-150":
            isIntersecting && animate,
        },
        { "items-center": alignment === "center" },
        { "items-end": alignment === "end" }
      )}
    >
      <div
        className={classNames(
          "relative prose 2xl:prose-lg mb-6 leading-loose",
          { "text-center": alignment === "center" },
          { "text-end": alignment === "end" },
          { "text-white": darkMode },
        )}
      >
        <BiSolidQuoteAltLeft
          size={40}
          className={classNames(
            "absolute -top-4 -left-4 -z-10",
            { "text-slate-300/70": !darkMode },
            { "text-slate-300/20": darkMode }
          )}
        />
        {content && <MarkdownRenderer>{content}</MarkdownRenderer> }
      </div>
      {rating > 0 && (
        <div className="flex gap-2 mb-6">
          {new Array(rating).fill(0).map((_item, idx) => (
            <AiFillStar
              key={idx}
              className={classNames(
                { "text-primary-600": !darkMode },
                { "text-primary-600/50": darkMode }
              )}
              size={20}
            />
          ))}
        </div>
      )}
      <div
        className={classNames(
          "flex flex-wrap items-center gap-4",
          { "justify-center": alignment === "center" },
          { "justify-end": alignment === "end" }
        )}
      >
        {portrait && (
          <div className="w-12 h-12">
            <MediaItem data={portrait} aspectRatio="square" rounded="full" />
          </div>
        )}

        {(name || role) && (
          <div className="flex flex-col">
            <div
              className={classNames("font-semibold", {
                "text-slate-100": darkMode,
              })}
            >
              {name}
            </div>
            <div
              className={classNames(
                "text-sm",
                { "text-slate-500": !darkMode },
                { "text-slate-200": darkMode }
              )}
            >
              {role}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
