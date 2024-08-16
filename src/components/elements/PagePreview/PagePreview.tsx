import classNames from "classnames";
import Link from "next/link";
import { TextAlignmentType, PageType } from "@/lib/types";
import { MediaItem } from "../MediaItem/MediaItem";
import { useContext } from "react";
import { DarkModeContext } from "@/components/sections/ContentList/ContentList";
import { useInView } from "react-hook-inview";

export const PagePreview: React.FC<{
  data: PageType;
  layout?: "vertical" | "horizontal";
  alignment?: TextAlignmentType;
  animate?: boolean
}> = ({ data, layout = "vertical", alignment, animate }) => {
  const { title, url, metaTitle, metaImage } = data;
  const darkMode = useContext(DarkModeContext);
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  if (layout === "horizontal") {
    return (
      <div
        ref={ref}
        className={classNames(
          "rounded-theme flex gap-5",
          { "relative -bottom-10 opacity-0": animate },
          {
            "animate-slidingUpContent animation-delay-150":
              isIntersecting && animate,
          }
        )}
      >
        <div className="basis-1/3 flex-1">
          <Link href={url}>
            <MediaItem data={metaImage} aspectRatio="square" />
          </Link>
        </div>
        <div className="basis-2/3 flex-1 py-4 pr-4 lg:py-6 lg:pr-6">
          <h4
            className={classNames(
              "text-lg xl:text-xl font-heading file:font-semibold",
              { "text-neutral-50": darkMode },
              { "text-center": alignment === "center" },
              { "text-end": alignment === "end" }
            )}
          >
            <Link href={url}>{metaTitle ?? title}</Link>
          </h4>
        </div>
      </div>
    );
  }
  return (
    <div
      ref={ref}
      className={classNames(
        "group rounded-theme flex flex-col pb-4 lg:pb-6",
        { "relative -bottom-10 opacity-0": animate },
        {
          "animate-slidingUpContent animation-delay-150":
            isIntersecting && animate,
        }
      )}
    >
      <Link href={url}>
        <MediaItem data={metaImage} altText={metaImage?.title} aspectRatio="4/3" zoomInOverHover />
        <h4
          className={classNames(
            "mt-4 text-lg xl:text-xl font-heading font-semibold group-hover:text-primary-600 transition-colors duration-300 ease-in-out",
            { "text-neutral-50": darkMode },
            { "text-center": alignment === "center" },
            { "text-end": alignment === "end" }
          )}
        >
          {metaTitle ?? title}
        </h4>
      </Link>
    </div>
  );
};
