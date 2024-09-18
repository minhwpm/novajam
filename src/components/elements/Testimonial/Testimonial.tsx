"use client";
import classNames from "classnames";
import { TextAlignmentType, TestimonialType } from "@/helpers/types";
import { MediaItem } from "../MediaItem/MediaItem";
import { AiFillStar } from "react-icons/ai";
import { useInView } from "react-hook-inview";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import { MarkdownRenderer } from "../MarkdownRenderer/MarkdownRenderer";

export const Testimonial: React.FC<{
  index?: number;
  data: TestimonialType;
  alignment?: TextAlignmentType;
  animate?: boolean;
}> = ({ index, data, alignment = "center", animate }) => {
  const { content, portrait, name, role, rating } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  return (
    <div
      ref={ref}
      className={classNames("px-4 flex flex-col rounded-theme", {
        "relative -bottom-10 opacity-0": animate,
        "animate-slidingUpContent": isIntersecting && animate,
        "items-center": alignment === "center",
        "items-end": alignment === "end",
      })}
      style={{
        animationDelay: (index && animate) ? `${(index + 1) * 0.15}s` : "0s",
      }}
    >
      <div
        className={classNames(
          "relative prose 2xl:prose-lg mb-6 leading-loose dark:text-slate-100",
          {
            "text-center": alignment === "center",
            "text-end": alignment === "end",
          }
        )}
      >
        <BiSolidQuoteAltLeft
          size={40}
          className={classNames(
            "absolute -top-4 -left-4 -z-10 text-slate-300/70 dark:text-slate-300/20"
          )}
        />
        {content && <MarkdownRenderer>{content}</MarkdownRenderer>}
      </div>
      {rating > 0 && (
        <div className="flex gap-2 mb-6">
          {new Array(rating).fill(0).map((_item, idx) => (
            <AiFillStar
              key={idx}
              className={classNames(
                "text-primary-600 dark:text-primary-600/50"
              )}
              size={20}
            />
          ))}
        </div>
      )}
      <div
        className={classNames("flex flex-wrap items-center gap-4", {
          "justify-center": alignment === "center",
          "justify-end": alignment === "end",
        })}
      >
        {portrait && (
          <div className="w-12 h-12">
            <MediaItem data={portrait} aspectRatio="square" rounded="full" />
          </div>
        )}

        {(name || role) && (
          <div className="flex flex-col">
            <div className={classNames("font-semibold dark:text-slate-100")}>
              {name}
            </div>
            <div
              className={classNames(
                "text-sm text-slate-500 dark:text-slate-100/70"
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
