"use client";
import classNames from "classnames";
import readingTime from "reading-time";
import Link from "next/link";
import {
  TextAlignmentType,
  BlogType,
  MediaAspectRatioType,
} from "@/helpers/types";
import { MediaItem } from "../MediaItem/MediaItem";
import { usePathname } from "next/navigation";
import { useInView } from "react-hook-inview";
import { format } from "date-fns";
import { MarkdownRenderer } from "../MarkdownRenderer/MarkdownRenderer";

const Topics: React.FC<{ topics: string[]; alignment?: TextAlignmentType }> = ({
  topics,
  alignment,
}) => (
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
        className="rounded-theme px-2.5 py-1 text-xs text-slate-500 bg-slate-100 dark:bg-slate-100/10 tracking-wider"
      >
        {topic}
      </div>
    ))}
  </div>
);

// Separate component for rendering reading time
const ReadingTime: React.FC<{
  readingTimeStats: { text: string; minutes: number };
}> = ({ readingTimeStats }) =>
  readingTimeStats.minutes ? (
    <div className="text-slate-400 dark:text-slate-100/50 text-xs font-medium uppercase">
      {readingTimeStats.text}
    </div>
  ) : null;

interface BlogPreviewProps {
  index?: number;
  data: BlogType;
  aspectRatio?: MediaAspectRatioType;
  layout?: "vertical" | "horizontal" | "featured";
  alignment?: TextAlignmentType;
  animate?: boolean;
  featured?: boolean;
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({
  index,
  data,
  aspectRatio = "4/3",
  layout = "vertical",
  alignment,
  animate,
  featured,
}) => {
  const { title, slug, summary, content, media, topics, firstPublishedAt } =
    data;
  const pathname = usePathname();
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  const readingTimeStats = readingTime(content || "");
  const animationDelay = index && animate ? `${(index + 1) * 0.15}s` : "0s";

  // Shared content layout
  const renderContent = (
    <div className={classNames("flex gap-x-4 justify-between items-center")}>
      {topics?.length > 0 && <Topics topics={topics} alignment={alignment} />}
      <ReadingTime readingTimeStats={readingTimeStats} />
    </div>
  );

  const renderTitle = (
    <h3
      className={classNames(
        "font-heading font-semibold transition-colors duration-500 group-hover:text-primary-600 dark:text-slate-100 dark:group-hover:text-primary-600/80",
        {
          "text-lg": !featured || layout === "horizontal",
          "text-xl xl:text-2xl": featured && layout==="vertical",
          "text-center": alignment === "center",
          "text-end": alignment === "end",
        }
      )}
    >
      {title}
    </h3>
  );

  const renderSummary = featured && summary && (
    <div className="line-clamp-3 prose text-slate-500 dark:text-slate-100/70">
      <MarkdownRenderer>{summary || ""}</MarkdownRenderer>
    </div>
  );

  const renderDate = firstPublishedAt && (
    <div
      className={classNames(
        "text-sm text-slate-400 dark:text-slate-100/50"
      )}
    >
      {format(Date.parse(firstPublishedAt), "MMMM dd, yyyy")}
    </div>
  );

  const contentWrapperClass = classNames("group rounded-theme", {
    "relative -bottom-10 opacity-0": animate,
    "animate-slidingUpContent": isIntersecting && animate,
  });

  if (layout === "horizontal") {
    return (
      <div ref={ref} className={contentWrapperClass} style={{ animationDelay }}>
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
            <div className="basis-2/3 flex-1 flex flex-col gap-y-2">
              {renderContent}
              {renderTitle}
              {renderSummary}
              {renderDate}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div ref={ref} className={contentWrapperClass} style={{ animationDelay }}>
      <Link href={`${pathname.replace(/\/blog\/?(.*)$/, "")}/blog/${slug}`}>
        <MediaItem
          data={media}
          altText={title}
          aspectRatio={aspectRatio}
          zoomInOverHover
        />
        <div className="w-full pb-8 pt-4 flex flex-col gap-y-3">
          {renderContent}
          {renderTitle}
          {renderSummary}
          {renderDate}
        </div>
      </Link>
    </div>
  );
};
