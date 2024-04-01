import { ExpertType } from "@/helpers/types";
import Link from "next/link";
import { SNS } from "@/components/elements/SNS/SNS";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import { useContext } from "react";
import classNames from "classnames";

interface Props {
  data: ExpertType;
  layout: "horizontal" | "vertical";
}

export const ExpertPreview: React.FC<Props> = ({ data, layout }) => {
  const {
    slug,
    fullName,
    portrait,
    role,
    specialization,
    organization,
    summary,
    sns,
  } = data;
  const darkMode = useContext(DarkModeContext);
  if (layout === "horizontal") {
    return (
      <div className={classNames("flex flex-wrap py-4 bg-white")}>
        <div className="w-1/3 md:w-1/4">
          <MediaItem data={portrait} aspectRatio="square" rounded="full" />
        </div>
        <div className="w-full pt-6 md:w-3/4 md:pt-0 md:pl-10">
          <Link
            className="font-heading underline-hover-effect font-semibold text-2xl md:text-3xl mb-5"
            href={`/expert/${slug}`}
          >
            {fullName}
          </Link>
          <div className="font-semibold text-neutral-600 italic">{role}</div>
          {specialization && (
            <div className="flex flex-wrap items-center gap-2">
              {specialization.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          )}
          <div>{organization}</div>
          {summary && (
            <div className="my-4 prose 2xl:prose-lg max-w-none">{summary}</div>
          )}
          {sns && <SNS data={sns} />}
        </div>
      </div>
    );
  }
  return (
    <div
      className={classNames("group bg-white rounded-assets", {
        "bg-opacity-5": darkMode,
      })}
    >
      <Link href={`/expert/${slug}`}>
        <MediaItem data={portrait} aspectRatio="square" />
      </Link>
      <div className="w-full px-4 pt-4 pb-6 flex flex-col items-center gap-1 rounded-b-assets">
        <Link
          className={classNames(
            "font-heading font-semibold text-lg",
            {
              "text-neutral-800 underline-hover-effect hover:text-primary-600 ":
                !darkMode,
            },
            { "text-neutral-50 hover:text-primary-500": darkMode }
          )}
          href={`/expert/${slug}`}
        >
          {fullName}
        </Link>
        {(role || specialization || summary) && (
          <>
            {role && (
              <div
                className={classNames(
                  "font-semibold italic",
                  { "text-neutral-700": !darkMode },
                  { "text-neutral-50": darkMode }
                )}
              >
                {role}
              </div>
            )}
            {specialization && (
              <div
                className={classNames(
                  "flex flex-wrap items-center justify-center gap-2",
                  { "text-primary-50": darkMode }
                )}
              >
                {specialization.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            )}
            {summary && (
              <div
                className={classNames("prose line-clamp-3 text-center", {
                  "text-primary-100": darkMode,
                })}
              >
                {summary}
              </div>
            )}
          </>
        )}
        {sns && <SNS data={sns} />}
      </div>
    </div>
  );
};
