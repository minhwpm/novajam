"use client";
import classNames from "classnames";
import {
  FlexibleContentType,
  FeaturedContentType,
  FeaturedContentVariantType,
} from "@/lib/types";
import { RichText } from "@/components/elements/RichText/RichText";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { useInView } from "react-hook-inview";
import "@/app/styles/bg-color.css";
import "@/app/styles/padding.css";

const TextPart: React.FC<{
  data: FlexibleContentType;
  appearanceVariant: FeaturedContentVariantType;
  darkMode: boolean;
}> = ({ data, appearanceVariant, darkMode }) => {
  const { eyebrow, heading, description, buttons } = data;

  return (
    <>
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
      {heading && (
        <div
          className={classNames(
            "text-heading leading-tight font-heading max-w-6xl mb-4 lg:mb-8",
            { "text-neutral-50": darkMode }
          )}
        >
          <RichText data={heading} />
        </div>
      )}
      {description && (
        <div
          className={classNames(
            "block prose xl:prose-lg",
            { "text-neutral-100": darkMode },
            { "mb-4 lg:mb-8": buttons && buttons.length > 0 }
          )}
        >
          <RichText data={description} />
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <ButtonGroup
          data={buttons}
          size="lg"
          alignment={
            ["Vertical (Text | Media)", "Vertical (Media | Text)"].includes(
              appearanceVariant
            )
              ? "center"
              : undefined
          }
        />
      )}
    </>
  );
};

export const FeaturedContent: React.FC<{ data: FeaturedContentType }> = ({ data }) => {
  const { htmlid, appearanceVariant, size, content, mediaAspectRatio, backgroundColor, backgroundImage, darkMode } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true
  });
  
  if (content === null) {
    return null
  }
  const renderMediaPart = () => (
    <div
      className={classNames("relative w-full -bottom-10 opacity-0", {
        "animate-slidingUpContent animation-delay-150": isIntersecting,
        "lg:w-6/12": [
          "Horizontal (Text | Media)",
          "Horizontal (Media | Text)",
        ].includes(appearanceVariant),
      })}
    >
      <FlexibleContentMediaPart
        data={content}
        rounded={size === "extended" ? "none" : "theme"}
        aspectRatio={mediaAspectRatio}
      />
    </div>
  );

  const renderTextPart = () => (
    <div
      className={classNames(
        "relative -bottom-10 opacity-0 self-center w-full flex flex-col",
        {
          "animate-slidingUpContent animation-delay-500": isIntersecting,
          "items-center pt-4 md:pt-6 lg:pt-8 xl:pt-10 text-center":
            appearanceVariant === "Vertical (Media | Text)",
          "items-center pb-4 md:pb-6 lg:pb-8 xl:pb-10 text-center":
            appearanceVariant === "Vertical (Text | Media)",
          "px-4 pb-12 md:pb-14 lg:pb-16 xl:pb-18 2xl:pb-20":
            appearanceVariant === "Vertical (Media | Text)" &&
            size === "extended",
          "px-4 pt-12 md:pt-14 lg:pt-16 xl:pt-18 2xl:pt-20":
            appearanceVariant === "Vertical (Text | Media)" &&
            size === "extended",
          "lg:w-1/2 pb-4 lg:pr-16 xl:pr-24":
            appearanceVariant === "Horizontal (Text | Media)",
          "custom-padding-left pr-4 py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24":
            appearanceVariant === "Horizontal (Text | Media)" &&
            size === "extended",
          "lg:w-1/2 pt-4 lg:pl-16 xl:pl-24":
            appearanceVariant === "Horizontal (Media | Text)",
          "custom-padding-right pl-4 py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24":
            appearanceVariant === "Horizontal (Media | Text)" &&
            size === "extended",
        }
      )}
    >
      <TextPart
        data={content}
        appearanceVariant={appearanceVariant}
        darkMode={darkMode}
      />
    </div>
  );
  
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
        },
      )}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage.url})`, }
          : {}
      }
    >
      <div
        className={classNames("w-full flex flex-wrap gap-4 lg:gap-0", {
          "container mx-auto px-4": size === "standard",
          "flex-col items-center":
            appearanceVariant === "Vertical (Media | Text)",
          "flex-col-reverse": appearanceVariant === "Vertical (Text | Media)",
          "flex-row-reverse flex-wrap-reverse": appearanceVariant === "Horizontal (Text | Media)",
        })}
      >
        {renderMediaPart()}
        {renderTextPart()}
      </div>
    </section>
  );
};

export default FeaturedContent;