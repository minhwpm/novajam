"use client"
import classNames from "classnames";
import { TextAlignmentType, TestimonialType } from "@/lib/types";
import { RichText } from "@/components/elements/RichText/RichText";
import { MediaItem } from "../MediaItem/MediaItem";
import { AiFillStar } from "react-icons/ai";
import { useInView } from "react-hook-inview";
import { useContext } from "react";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import { RxQuote } from "react-icons/rx";

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
          "relative prose 2xl:prose-lg mb-6",
          { "text-center": alignment === "center" },
          { "text-end": alignment === "end" },
          { "text-neutral-100": darkMode },
        )}
      >
        <RxQuote size={40} className="text-neutral-200/70 absolute -top-4 -left-4 rotate-180 -z-10" />
        <RxQuote size={40} className="text-neutral-200/70 absolute -bottom-4 -right-4 -z-10" />
        <RichText data={content} />
      </div>
      {rating > 0 && (
        <div className="flex gap-2 mb-6">
          {new Array(rating).fill(0).map((_item, idx) => (
            <AiFillStar key={idx} className={classNames(
              { "text-primary-600": !darkMode },
              { "text-primary-400": darkMode },
            )} size={20} />
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
            <div className={classNames("font-semibold",
              { "text-neutral-100": darkMode },

            )}>{name}</div>
            <div className={classNames("text-sm",
              { "text-neutral-500": !darkMode },
              { "text-neutral-200": darkMode },

            )}>{role}</div>
          </div>
        )}
      </div>
    </div>
  );
};
