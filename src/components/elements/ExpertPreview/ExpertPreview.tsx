import { ExpertType, TextAlignmentType } from "@/lib/types";
import { SNS } from "@/components/elements/SNS/SNS";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import { useContext } from "react";
import classNames from "classnames";
import { useInView } from "react-hook-inview";

export const ExpertPreview: React.FC<{
  data: ExpertType;
  layout: "horizontal" | "vertical";
  alignment?: TextAlignmentType;
  animate?: boolean;
}> = ({ data, layout, alignment, animate }) => {
  const {
    fullName,
    portrait,
    role,
    specialization,
    organization,
    summary,
    sns,
  } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  const darkMode = useContext(DarkModeContext);
  if (layout === "horizontal") {
    return (
      <div
        ref={ref}
        className={classNames(
          "flex flex-wrap gap-y-4 justify-center rounded-theme",
          { "relative -bottom-10 opacity-0": animate },
          {
            "animate-slidingUpContent animation-delay-150":
              isIntersecting && animate,
          }
        )}
      >
        <div className="w-1/2 sm:w-1/3 md:w-1/4">
          <MediaItem data={portrait} aspectRatio="square" rounded="full" />
        </div>
        <div className="w-full sm:w-2/3 md:w-3/4 sm:pl-4 md:pl-6 lg:pl-8">
          <div
            className={classNames(
              "font-heading font-semibold text-2xl md:text-3xl text-center sm:text-start mb-2",
              { "text-neutral-50": darkMode }
            )}
          >
            {fullName}
          </div>
          {role && (
            <div
              className={classNames(
                "font-semibold text-center sm:text-start",
                { "text-neutral-500": !darkMode },
                { "text-neutral-200": darkMode }
              )}
            >
              {role}
            </div>
          )}
          {specialization && (
            <div
              className={classNames(
                "flex flex-wrap items-center gap-2 justify-center sm:justify-start",
                { "text-neutral-500": !darkMode },
                { "text-neutral-200": darkMode }
              )}
            >
              {specialization.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          )}
          {organization && (
            <div
              className={classNames(
                "text-center sm:text-start",
                { "text-neutral-500": !darkMode },
                { "text-neutral-200": darkMode }
              )}
            >
              {organization}
            </div>
          )}
          {summary && (
            <div
              className={classNames("my-4 prose 2xl:prose-lg max-w-none", {
                "text-neutral-100": darkMode,
              })}
            >
              {summary}
            </div>
          )}
          {sns && <SNS data={sns} />}
        </div>
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
        },
        {
          "bg-white": !darkMode,
        }
      )}
    >
      <div className="relative">
        <MediaItem data={portrait} aspectRatio="square" />
        {summary && (
          <div
            className={classNames(
              "absolute bottom-0 opacity-0 group-hover:opacity-90 transition-opacity duration-500 ease-in-out rounded-b-theme gr p-4 text-neutral-200 bg-primary-700 prose"
            )}
          >
            <div className="line-clamp-5">{summary}</div>
          </div>
        )}
      </div>
      <div
        className={classNames(
          "w-full px-4 pt-4 pb-6 flex flex-col gap-1 rounded-b-theme",
          { "text-center": alignment === "center" },
          { "text-end": alignment === "end" }
        )}
      >
        <div
          className={classNames(
            "font-heading font-semibold text-lg xl:text-xl",
            {
              "text-neutral-800": !darkMode,
            },
            { "text-neutral-50": darkMode }
          )}
        >
          {fullName}
        </div>
        {role && (
          <div
            className={classNames(
              { "text-neutral-500": !darkMode },
              { "text-neutral-200": darkMode }
            )}
          >
            {role}
          </div>
        )}
        {specialization && (
          <div
            className={classNames(
              "flex flex-wrap gap-2",
              { "justify-center": alignment === "center" },
              { "justify-end": alignment === "end" },
              { "text-neutral-500": !darkMode },
              { "text-neutral-200": darkMode }
            )}
          >
            {specialization.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </div>
        )}
        {organization && (
          <div
            className={classNames(
              { "text-neutral-500": !darkMode },
              { "text-neutral-200": darkMode }
            )}
          >
            {organization}
          </div>
        )}
        {sns && (
          <div
            className={classNames(
              "flex",
              { "justify-center": alignment === "center" },
              { "justify-end": alignment === "end" }
            )}
          >
            <SNS data={sns} darkMode={darkMode} />
          </div>
        )}
      </div>
    </div>
  );
};
