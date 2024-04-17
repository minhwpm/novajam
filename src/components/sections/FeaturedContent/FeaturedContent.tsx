"use client"
import classNames from "classnames";
import { ContentPieceType, FeaturedContentType, FeaturedContentVariantType } from "@/helpers/types";
import { RichText } from "@/components/elements/RichText/RichText";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { Container } from "@/components/elements/Container/Container";
import { useInView } from "react-hook-inview";
import "@/app/css/bg-color.css";
import "@/app/css/padding.css";

const TextPart: React.FC<{ data: ContentPieceType, appearanceVariant: FeaturedContentVariantType, darkMode: boolean }> = ({ data, appearanceVariant, darkMode }) => {
  const { eyebrow, heading, description, buttons  } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "tracking-widest mb-2 font-medium",
            { "text-primary-500": !darkMode },
            { "text-primary-400": darkMode },
            {
              "text-center":
                appearanceVariant === "Vertical (Text | Image)" ||
                appearanceVariant === "Vertical (Image | Text)",
            }
          )}
        >
          {eyebrow}
        </div>
      )}
      {heading && (
        <div
          className={classNames(
            "text-heading leading-tighter font-heading  max-w-6xl mb-8",
            { "text-neutral-50": darkMode },
            {
              "text-center mx-auto":
                appearanceVariant === "Vertical (Text | Image)" ||
                appearanceVariant === "Vertical (Image | Text)",
            }
          )}
        >
          <RichText data={heading} />
        </div>
      )}
      {description && (
        <div
          className={classNames(
            "block prose xl:prose-lg",
            { "text-neutral-100": darkMode } ,
            {
              "mx-auto":
                appearanceVariant === "Vertical (Text | Image)" ||
                appearanceVariant === "Vertical (Image | Text)",
            },
            { "mb-8": buttons && buttons.length > 0 }
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
            appearanceVariant === "Vertical (Text | Image)" ||
            appearanceVariant === "Vertical (Image | Text)"
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
  if (size === "extended") {
    return (
      <section
        id={htmlid}
        ref={ref}
        className={classNames(
          `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
        )}
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage.url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
              }
            : {}
        }
      >
        <div
          className={classNames(
            "relative flex flex-wrap",
            { "flex-row-reverse": appearanceVariant === "Horizontal (Text | Image)" },
            { "flex-col": appearanceVariant === "Vertical (Image | Text)" },
            { "flex-col-reverse": appearanceVariant === "Vertical (Text | Image)" }
          )}
        >
          <div
            className={classNames(
              "relative w-full -bottom-10 opacity-0",
              { "animate-slidingUpContent animation-delay-150": isIntersecting },
              { "lg:w-6/12": appearanceVariant === "Horizontal (Text | Image)" },
              { "lg:w-6/12": appearanceVariant === "Horizontal (Image | Text)" }
            )}
          >
            <FlexibleContentMediaPart
              data={content}
              rounded="none"
              aspectRatio={mediaAspectRatio}
            />
          </div>
          <div
            className={classNames(
              "relative -bottom-10 opacity-0 self-center w-full pt-4 md:pt-8 lg:pt-16 pb-16 flex flex-col",
              { "animate-slidingUpContent animation-delay-500": isIntersecting },
              {
                "lg:w-1/2 px-4 md:px-10 lg:pr-16 xl:pr-24 custom-padding-left":
                  appearanceVariant === "Horizontal (Text | Image)",
              },
              {
                "lg:w-1/2 px-4 md:px-10 lg:pl-16 xl:pl-24 custom-padding-right":
                  appearanceVariant === "Horizontal (Image | Text)",
              }
            )}
          >
            <TextPart data={content} appearanceVariant={appearanceVariant} darkMode={darkMode} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={htmlid}
      ref={ref}
      className={classNames(
        "py-12 md:py-14 lg:py-16 xl:py-18 2xl:py-20",
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage.url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundBlendMode: "multiply",
            }
          : {}
      }
    >
      <Container>
        <div
          className={classNames(
            "w-full flex flex-wrap",
            { "flex-col gap-y-6": appearanceVariant === "Vertical (Image | Text)" },
            {
              "flex-col-reverse gap-y-6": appearanceVariant === "Vertical (Text | Image)",
            },
            { "flex-row-reverse": appearanceVariant === "Horizontal (Text | Image)" }
          )}
        >
          <div
            className={classNames(
              "relative -bottom-10 opacity-0 w-full max-w-5xl mx-auto",
              {
                "animate-slidingUpContent animation-delay-150": isIntersecting,
              },
              {
                "w-full lg:w-6/12":
                  appearanceVariant === "Horizontal (Text | Image)" ||
                  appearanceVariant === "Horizontal (Image | Text)",
              }
            )}
          >
            <FlexibleContentMediaPart
              data={content}
              aspectRatio={mediaAspectRatio}
            />
          </div>
          <div
            className={classNames(
              "relative -bottom-10 opacity-0 py-6 self-center flex flex-col mx-auto",
              {
                "animate-slidingUpContent animation-delay-500": isIntersecting,
              },
              {
                "lg:w-1/2 md:pr-8 lg:pr-16":
                  appearanceVariant === "Horizontal (Text | Image)",
              },
              {
                "lg:w-1/2 md:pl-8 lg:pl-16":
                  appearanceVariant === "Horizontal (Image | Text)",
              }
            )}
          >
            <TextPart data={content} appearanceVariant={appearanceVariant} darkMode={darkMode} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedContent;