"use client";
import classNames from "classnames";
import Link from "next/link";
import { useContext } from "react";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import {
  TextAlignmentType,
  BlogType,
  MediaAspectRatioType,
} from "@/lib/types";
import { MediaItem } from "../MediaItem/MediaItem";
import { usePathname } from "next/navigation";
import { useInView } from "react-hook-inview";
import { format } from "date-fns";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import readingTime from "reading-time";

export const BlogPreview: React.FC<{
  data: BlogType;
  aspectRatio?: MediaAspectRatioType;
  layout?: "vertical" | "horizontal" | "featured";
  alignment?: TextAlignmentType;
  animate?: boolean;
  featured?: boolean;
}> = ({
  data,
  aspectRatio = "4/3",
  layout = "vertical",
  alignment,
  animate,
  featured,
}) => {
  const { title, slug, content, media, topics, firstPublishedAt } = data;
  const darkMode = useContext(DarkModeContext);
  const pathname = usePathname();
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  const readingTimeStats = readingTime(documentToPlainTextString(content));
  const renderTopic = () => (
    <div
      className={classNames(
        "text-xs uppercase tracking-widest flex flex-wrap gap-x-2 gap-y-1",
        { "justify-center": alignment === "center" },
        { "justify-end": alignment === "end" }
      )}
    >
      {topics.map((topic, idx) => (
        <div
          key={idx}
          className="rounded-theme px-2.5 py-1 text-xs bg-primary-50 border border-primary-50 text-neutral-600 tracking-wider"
        >
          {topic}
        </div>
      ))}
    </div>
  );
  if (layout === "horizontal") {
    return (
      <div
        ref={ref}
        className={classNames(
          "group rounded-theme relative",
          { "relative -bottom-10 opacity-0": animate },
          {
            "animate-slidingUpContent animation-delay-150":
              isIntersecting && animate,
          }
        )}
      >
        <Link href={`${pathname.replace(/\/blog\/?(.*)$/, "")}/blog/${slug}`}>
          <div className="flex gap-4">
            <div className="basis-1/3 flex-1">
              <MediaItem
                data={media}
                altText={title}
                aspectRatio={aspectRatio}
                zoomInOverHover
              />
            </div>
            <div className="basis-2/3 flex-1 flex flex-col gap-y-1 pr-4">
              <div className="flex gap-x-4 justify-between items-center">
                {topics && topics.length > 0 && renderTopic()}
                {readingTimeStats.minutes > 0 && (
                  <div className="text-neutral-500 text-sm font-medium uppercase">
                    {readingTimeStats.text}
                  </div>
                )}
              </div>
              <h3
                className={classNames(
                  "font-heading xl:text-lg font-semibold transition-colors duration-500",
                  { "group-hover:text-primary-600": !darkMode },
                  { "text-neutral-100 group-hover:text-primary-300": darkMode }
                )}
              >
                {title}
              </h3>
              <div
                className={classNames(
                  "text-sm my-2",
                  { "text-neutral-500": !darkMode },
                  { "text-neutral-300": darkMode }
                )}
              >
                {firstPublishedAt &&
                  format(Date.parse(firstPublishedAt), "MMMM dd, yyyy")}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={classNames(
        "group rounded-theme",
        { "relative -bottom-10 opacity-0": animate },
        {
          "animate-slidingUpContent animation-delay-150":
            isIntersecting && animate,
        }
      )}
    >
      <Link href={`${pathname.replace(/\/blog\/?(.*)$/, "")}/blog/${slug}`}>
        <MediaItem
          data={media}
          altText={title}
          aspectRatio={aspectRatio}
          zoomInOverHover
        />
        <div
          className={classNames("w-full px-4 pb-8 pt-4 flex flex-col gap-y-1")}
        >
          <div className="flex gap-x-4 justify-between items-center">
            {topics && topics.length > 0 && renderTopic()}
            {readingTimeStats.minutes > 0 && (
              <div className="text-neutral-500 text-sm font-medium uppercase">
                {readingTimeStats.text}
              </div>
            )}
          </div>
          <h3
            className={classNames(
              "font-heading font-semibold transition-colors duration-500",
              { "group-hover:text-primary-600": !darkMode },
              { "text-neutral-100 group-hover:text-primary-300": darkMode },
              { "text-lg": !featured },
              { "text-xl xl:text-2xl": featured },
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" }
            )}
          >
            {title}
          </h3>
          {featured && (
            <div className="line-clamp-3 prose text-neutral-600">
              {data.summary}
            </div>
          )}
          <div
            className={classNames(
              "text-smd my-2",
              { "text-neutral-500": !darkMode },
              { "text-neutral-300": darkMode }
            )}
          >
            {firstPublishedAt &&
              format(Date.parse(firstPublishedAt), "MMMM dd, yyyy")}
          </div>
        </div>
      </Link>
    </div>
  );
};
