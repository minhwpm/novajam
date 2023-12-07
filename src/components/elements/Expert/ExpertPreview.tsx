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
          <div className="font-semibold text-2xl md:text-3xl mb-5">
            <Link className="underline-hover-effect" href={`/expert/${slug}`}>
              {fullName}
            </Link>
          </div>
          <div className="font-semibold">{role}</div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-slate-500 uppercase text-sm tracking-wider">
              Specialty:
            </div>
            {specialization}
          </div>
          <div>{organization}</div>
          {summary && (
            <div className="my-5 prose lg:prose-lg max-w-none">{summary}</div>
          )}
          {sns && <SNS data={sns} />}
        </div>
      </div>
    );
  }
  return (
    <div className="group bg-white rounded-assets">
      <MediaItem data={portrait} aspectRatio="square" />
      <div className="w-full px-4 py-4 flex flex-col items-center gap-2  rounded-b-assets">
        <Link
          className="underline-hover-effect font-semibold text-xl"
          href={`/expert/${slug}`}
        >
          {fullName}
        </Link>
        {(role || specialization || summary) && (
          <div className="text-base flex flex-col gap-2 mb-4">
            {role && <div className="font-semibold text-center">{role}</div>}
            {specialization && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="text-neutral-500 uppercase text-sm tracking-wider">
                  Specialty:
                </div>
                <div className="text-neutral-600 ">{specialization} </div>
              </div>
            )}
            {summary && <div className="prose line-clamp-3 text-center">{summary}</div>}
          </div>
        )}
        {sns && <SNS data={sns} />}
      </div>
    </div>
  );
};
