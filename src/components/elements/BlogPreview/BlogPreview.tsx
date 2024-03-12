"use client";
import classNames from "classnames";
import Link from "next/link";
import { BlogType, MediaAspectRatioType } from "@/helpers/types";
import { usePathname } from "next/navigation";
import { MediaItem } from "../MediaItem/MediaItem";

export const BlogPreview: React.FC<{
  data: BlogType;
  aspectRatio?: MediaAspectRatioType;
  layout?: "vertical" | "horizontal";
}> = ({ data, aspectRatio = "3/2", layout = "vertical" }) => {
  const { title, slug, media, topics } = data;
  const pathname = usePathname();
  if (layout === "horizontal") {
    return (
      <div className="rounded-assets bg-white relative bottom-0 hover:bottom-2 transition-all duration-500 ease">
        <Link href={`${pathname}/blog/${slug}`}>
          <div className="flex gap-4">
            <div className="basis-1/3 flex-1">
              <MediaItem data={media} aspectRatio={aspectRatio} />
            </div>
            <div className="basis-2/3 flex-1 flex flex-col py-2 pr-4">
              {topics && topics.length > 0 && (
                <div className="text-xs text-primary-600 uppercase tracking-widest flex flex-wrap gap-x-5 gap-y-1 mb-2">
                  {topics.map((topic, idx) => (
                    <span key={idx}>{topic}</span>
                  ))}
                </div>
              )}
              <h4 className="font-heading lg:text-lg font-semibold hover:text-primary-600 transition-colors duration-500">
                {title}
              </h4>
            </div>
          </div>
        </Link>
      </div>

    );
  }
  return (
    <div className="rounded-assets bg-white relative bottom-0 hover:bottom-2 transition-all duration-500 ease">
      <Link href={`${pathname}/blog/${slug}`}>
        <MediaItem data={media} aspectRatio={aspectRatio} />
        <div className={classNames("w-full px-4 pb-8 pt-4 flex flex-col")}>
          {topics && topics.length > 0 && (
            <div className="text-xs text-primary-600 uppercase tracking-widest flex flex-wrap gap-x-5 gap-y-1 mb-2">
              {topics.map((topic, idx) => (
                <span key={idx}>{topic}</span>
              ))}
            </div>
          )}
          <h4 className="font-heading text-lg font-semibold hover:text-primary-600 transition-colors duration-500">
            {title}
          </h4>
        </div>
      </Link>
    </div>
  );
};
