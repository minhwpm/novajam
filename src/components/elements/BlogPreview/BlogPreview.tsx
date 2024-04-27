"use client";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image"
import { TextAlignmentType, BlogType, MediaAspectRatioType } from "@/helpers/types";
import { usePathname } from "next/navigation";
import { useInView } from "react-hook-inview";

export const BlogPreview: React.FC<{
  data: BlogType;
  aspectRatio?: MediaAspectRatioType;
  layout?: "vertical" | "horizontal";
  alignment?: TextAlignmentType;
  animate?: boolean;
}> = ({ data, aspectRatio = "4/3", layout = "vertical", alignment, animate }) => {
  const { title, slug, media, topics } = data;
  const pathname = usePathname();
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  if (layout === "horizontal") {
    return (
      <div
        ref={ref}
        className={classNames(
          "group rounded-assets bg-white relative",
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
              <div className="w-full overflow-hidden rounded-assets">
                <Image
                  className={classNames(
                    "w-full object-cover group-hover:scale-110 transition-all duration-500",
                    `aspect-${aspectRatio}`
                  )}
                  alt={media?.title ?? ""}
                  src={media?.url ?? "/bluebiz_square.webp"}
                  width={media?.width ?? 400}
                  height={media?.height ?? 400}
                />
              </div>
            </div>
            <div className="basis-2/3 flex-1 flex flex-col py-2 pr-4">
              {topics && topics.length > 0 && (
                <div className="text-xs text-primary-600 uppercase tracking-widest flex flex-wrap gap-x-5 gap-y-1 mb-2">
                  {topics.map((topic, idx) => (
                    <span key={idx}>{topic}</span>
                  ))}
                </div>
              )}
              <h4 className="font-heading lg:text-lg font-semibold group-hover:text-primary-600 transition-colors duration-500">
                {title}
              </h4>
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
        "group rounded-assets bg-white",
        { "relative -bottom-10 opacity-0": animate },
        {
          "animate-slidingUpContent animation-delay-150":
            isIntersecting && animate,
        }
      )}
    >
      <Link href={`${pathname.replace(/\/blog\/?(.*)$/, "")}/blog/${slug}`}>
        {/* <MediaItem data={media} aspectRatio={aspectRatio} /> */}
        <div className="w-full overflow-hidden rounded-assets">
          <Image
            className={classNames(
              "w-full object-cover group-hover:scale-110 transition-all duration-500",
              `aspect-${aspectRatio}`
            )}
            alt={media?.title ?? ""}
            src={media?.url ?? "/bluebiz_square.webp"}
            width={media?.width ?? 400}
            height={media?.height ?? 300}
          />
        </div>
        <div className={classNames("w-full px-4 pb-8 pt-4 flex flex-col")}>
          {topics && topics.length > 0 && (
            <div
              className={classNames(
                "text-xs text-primary-600 uppercase tracking-widest flex flex-wrap gap-x-5 gap-y-1 mb-2",
                { "justify-center": alignment === "center" },
                { "justify-end": alignment === "end" }
              )}
            >
              {topics.map((topic, idx) => (
                <span key={idx}>{topic}</span>
              ))}
            </div>
          )}
          <h4
            className={classNames(
              "font-heading text-lg font-semibold group-hover:text-primary-600 transition-colors duration-500",
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" }
            )}
          >
            {title}
          </h4>
        </div>
      </Link>
    </div>
  );
};
