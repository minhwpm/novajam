/* eslint-disable complexity */
import { ExpertType } from "@/helpers/types";
import Link from "next/link";
import { SNS } from "../SNS/SNS";
import { MediaItem } from "../MediaItem/MediaItem";

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
  if (layout === "horizontal") {
    return (
      <div className="flex flex-wrap py-5">
        <div className="w-1/3 md:w-1/4">
          <MediaItem data={portrait} aspectRatio="square" rounded="full" />
        </div>
        <div className="w-full pt-6 md:w-3/4 md:pt-0 md:pl-10">
          <Link className="font-heading underline-hover-effect font-semibold text-2xl md:text-3xl mb-5" href={`/expert/${slug}`}>
            {fullName}
          </Link>
          <div className="font-semibold text-neutral-600 italic">{role}</div>
          {specialization && 
            <div className="flex flex-wrap items-center gap-2">
              {specialization.map((item, index) => (
                <span key={index}>
                  {item}
                </span>
              ))}
            </div>
          }
          <div>{organization}</div>
          {summary && (
            <div className="my-5 prose 2xl:prose-lg max-w-none">{summary}</div>
          )}
          {sns && <SNS data={sns} />}
        </div>
      </div>
    );
  }
  return (
    <div className="group bg-white rounded-assets">
      <Link href={`/expert/${slug}`}>
        <MediaItem data={portrait} aspectRatio="square" />
      </Link>
      <div className="w-full px-4 py-4 flex flex-col items-center gap-2  rounded-b-assets">
        <Link
          className="font-heading font-semibold text-lg underline-hover-effect hover:text-primary-600"
          href={`/expert/${slug}`}
        >
          {fullName}
        </Link>
        {(role || specialization || summary) && (
          <>
            {role && <div className="font-semibold italic text-neutral-600">{role}</div>}
            {specialization && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {specialization.map((item, index) => (
                  <span key={index}>
                    {item}
                  </span>
                ))}
              </div>
            )}
            {summary && <div className="prose line-clamp-3 text-center">{summary}</div>}
          </>
        )}
        {sns && <SNS data={sns} />}
      </div>
    </div>
  );
};
