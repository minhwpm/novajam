"use client";
import classNames from "classnames";
import { useInView } from "react-hook-inview";
import { MarkdownRenderer } from "@/components/elements/MarkdownRenderer/MarkdownRenderer";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { HeroType } from "@/helpers/types";
import "@/app/styles/padding.css";
import "@/app/styles/bg-color.css";

export const Hero: React.FC<{ data: HeroType }> = ({ data }) => {
  const {
    htmlid,
    eyebrow,
    displayTitle,
    description,
    buttons,
    media,
    layout,
    textAlignment,
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
      id={htmlid ?? ""}
      ref={ref}
      className={classNames("pt-14 pb-6", {
        [`${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`]:
          backgroundColor,
        "bg-center bg-no-repeat bg-cover bg-blend-multiply": backgroundImage,
        "dark:bg-opacity-10": !darkMode && backgroundColor,
        "dark:bg-slate-900/90": !darkMode && backgroundImage,
        dark: darkMode,
        // "lg:bg-fixed": backgroundImage && parallaxBackground @TODO
      })}
      style={{
        backgroundImage: `url(${backgroundImage?.url})`,
      }}
    >
      <div
        className={classNames("flex flex-col items-center", {
          "container mx-auto px-4 mt-12 mb-8": layout === "top-to-bottom",
          "lg:flex-row": layout !== "top-to-bottom", //default layout = "side-by-side"
        })}
      >
        <div
          className={classNames(
            "flex flex-col py-16 lg:py-20 xl:py-24",
            { "px-4 custom-padding-left": layout !== "top-to-bottom" },
            { "items-center text-center": textAlignment === "center" },
            { "items-end text-end": textAlignment === "end" }
          )}
        >
          {eyebrow && (
            <div
              className={classNames(
                "text-sm xl:text-base tracking-widest max-w-2xl opacity-0 font-semibold mb-6 text-secondary-600 dark:text-secondary-500",
                {
                  "animate-slidingHeroContent animation-delay-500":
                    isIntersecting,
                }
              )}
            >
              {eyebrow}
            </div>
          )}
          {displayTitle && (
            <div
              className={classNames(
                "text-hero-heading leading-snug font-heading max-w-3xl opacity-0 dark:text-slate-100",
                { "animate-slidingHeroContent": isIntersecting }
              )}
            >
              <MarkdownRenderer>{displayTitle}</MarkdownRenderer>
            </div>
          )}
          {description && (
            <div
              className={classNames(
                "prose xl:prose-lg 2xl:prose-xl mt-4 max-w-2xl opacity-0 !leading-loose text-slate-500 dark:text-slate-100/70",
                {
                  "animate-slidingHeroContent animation-delay-200":
                    isIntersecting,
                }
              )}
            >
              <MarkdownRenderer>{description}</MarkdownRenderer>
            </div>
          )}
          {buttons.length > 0 && (
            <div
              className={classNames("mt-8 lg:mt-10 opacity-0", {
                "animate-slidingHeroContent animation-delay-400":
                  isIntersecting,
              })}
            >
              {buttons.length > 0 && (
                <ButtonGroup
                  data={buttons}
                  alignment={textAlignment}
                  size="lg"
                />
              )}
            </div>
          )}
        </div>
        {media && (
          <div
            className={classNames("w-full lg:basis-3/5 min-w-[55%] opacity-0", {
              "animate-slidingHeroContent animation-delay-300": isIntersecting,
            })}
          >
            <MediaItem data={media} videoAutoplay={true} priority={true} />
          </div>
        )}
      </div>
    </section>
  );
};