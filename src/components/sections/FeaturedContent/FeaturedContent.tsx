"use client";
import classNames from "classnames";
import { FeaturedContentType } from "@/helpers/types";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { useInView } from "react-hook-inview";
import { MarkdownRenderer } from "@/components/elements/MarkdownRenderer/MarkdownRenderer";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import "@/app/styles/bg-color.css";
import "@/app/styles/padding.css";

export const FeaturedContent: React.FC<{ data: FeaturedContentType }> = ({
  data,
}) => {
  const {
    eyebrow,
    displayTitle,
    description,
    buttons,
    items,
    media,
    mediaPosition,
    mediaAspectRatio,
    htmlid,
    size,
    backgroundColor,
    backgroundImage,
    darkMode,
  } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });

  return (
    <section
      id={htmlid}
      ref={ref}
      className={classNames(
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`,
        {
          "py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24": size === "standard",
          "lg:bg-fixed bg-center bg-no-repeat bg-cover bg-blend-multiply":
            backgroundImage,
          // "lg:bg-fixed": backgroundImage && parallaxBackground @TODO
        }
      )}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage.url})` }
          : {}
      }
    >
      <div
        className={classNames("w-full flex flex-wrap gap-4 lg:gap-0", {
          "container mx-auto px-4": size === "standard",
          "flex-row-reverse flex-wrap-reverse": mediaPosition === "right",
        })}
      >
        <div
          className={classNames("relative -bottom-10 opacity-0 lg:flex-1", {
            "animate-slidingUpContent animation-delay-150 ": isIntersecting,
          })}
        >
          {media && media.length === 1 && (
            <MediaItem
              data={media[0]}
              aspectRatio={mediaAspectRatio}
              videoControls
            />
          )}
          {media && media.length > 1 && (
            <MediaCarousel
              data={media}
              autoplay={{
                delay: 3500,
              }}
              pagination={{
                enabled: true,
              }}
              aspectRatio={mediaAspectRatio}
            />
          )}
        </div>
        {(eyebrow ||
          displayTitle ||
          description ||
          items.length ||
          buttons.length) && (
          <div
            className={classNames(
              "relative -bottom-10 opacity-0 lg:flex-1",
              {
                "animate-slidingUpContent animation-delay-300 ": isIntersecting,
              },
              { "pt-4 lg:pl-16 xl:pl-24": mediaPosition === "left" },
              {
                "custom-padding-right pl-4 py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24":
                  size === "extended" && mediaPosition === "left",
              },
              { "pb-4 lg:pr-16 xl:pr-24": mediaPosition === "right" }
            )}
          >
            {eyebrow && (
              <div
                className={classNames(
                  "text-sm xl:text-base tracking-widest mb-2 max-w-5xl",
                  { "text-primary-500": !darkMode },
                  { "text-primary-400": darkMode }
                )}
              >
                {eyebrow}
              </div>
            )}
            {displayTitle && (
              <div
                className={classNames(
                  "text-heading leading-snug font-heading max-w-3xl xl:max-w-4xl mb-4 lg:mb-8",
                  { "text-white": darkMode }
                )}
              >
                <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
              </div>
            )}
            {description && (
              <div
                className={classNames(
                  "block prose xl:prose-lg leading-loose",
                  { "text-white/70": darkMode },
                  { "text-slate-500": !darkMode },
                  { "mb-4 lg:mb-8": buttons && buttons.length > 0 }
                )}
              >
                <MarkdownRenderer>{description}</MarkdownRenderer>
              </div>
            )}
            <div>
              {buttons && buttons.length > 0 && (
                <ButtonGroup data={buttons} size="lg" alignment="start" />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedContent;