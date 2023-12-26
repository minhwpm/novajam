import { Section } from "@/components/elements/Section/Section";
import classNames from "classnames";
import { Button } from "@/components/elements/Button/Button";
import { ContentPieceType, FeatureLayoutType, FeatureType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";

const TextPart: React.FC<{ data: ContentPieceType, layout: FeatureLayoutType }> = ({ data, layout }) => {
  const { label, heading, description, buttons  } = data;
  return (
    <>
      {label && (
        <div
          className={classNames(
            "tracking-widest mb-2 text-secondary-500 font-semibold",
            {
              "text-center":
                layout === "Vertical (Text | Image)" ||
                layout === "Vertical (Image | Text)",
            }
          )}
        >
          {label}
        </div>
      )}
      {heading && (
        <div
          className={classNames(
            "text-heading leading-tight font-heading max-w-3xl mb-5",
            {
              "text-center mx-auto":
                layout === "Vertical (Text | Image)" ||
                layout === "Vertical (Image | Text)",
            }
          )}
        >
          <RichText2 data={heading} />
        </div>
      )}
      {description &&
        <div
          className={classNames("block prose lg:prose-lg", {
            "mx-auto":
              layout === "Vertical (Text | Image)" ||
              layout === "Vertical (Image | Text)",
          })}
        >
          <RichText2 data={description} />
        </div>
      }
      {buttons && buttons.length > 0 && (
        <div className="mt-10 flex items-center gap-5">
          {buttons.map((button) => (
            <Button
              key={button.id}
              variant={button.buttonVariant}
              url={button.url}
              size="lg"
              openNewTab={button.openNewTab}
            >
              {button.text}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

// @TODO refactor - reuse @/components/elements/FlexibleContentMediaPart
// const FlexibleContentMediaPart: React.FC<{ data: FeatureType, rounded?: "assets" | "none" }> = ({ data, rounded = "assets" }) => {
//   const { media, mediaAspectRatio } = data;
//   if (media.length === 1) {
//     return (
//       <MediaItem
//         data={media[0]}
//         aspectRatio={mediaAspectRatio === "16/9" ? "video" : mediaAspectRatio}
//         rounded={rounded}
//       />
//     );
//   }
//   // media.length > 1
//   return (
//     <MediaCarousel
//       data={media}
//       aspectRatio={mediaAspectRatio === "16/9" ? "video" : mediaAspectRatio}
//       rounded={rounded}
//       autoplay={{
//         delay: 5000,
//       }}
//       pagination={{
//         enabled: true,
//       }}
//       navigation={{
//         enabled: true,
//       }}
//     />
//   );
// };

export const Feature: React.FC<{ data: FeatureType }> = ({ data }) => {
  const { layout, uiVariant, backgroundImage, content } = data;
  if (!content) {
    return null
  }
  if (uiVariant === "extended") {
    return (
      <section
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage.url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundBlendMode: "overlay",
              }
            : {}
        }
        className={classNames(
          "relative flex flex-wrap",
          { "flex-row-reverse": layout === "Horizontal (Text | Image)" },
          { "flex-col": layout === "Vertical (Image | Text)" },
          { "flex-col-reverse": layout === "Vertical (Text | Image)" }
        )}
      >
        <div
          className={classNames(
            "w-full",
            { "lg:w-6/12": layout === "Horizontal (Text | Image)" },
            { "lg:w-6/12": layout === "Horizontal (Image | Text)" }
          )}
        >
          <FlexibleContentMediaPart data={content} rounded="none"/>
        </div>
        <div
          className={classNames(
            "w-full pt-4 md:pt-8 lg:pt-16 pb-16 flex flex-col",
            {
              "lg:w-1/2 px-4 md:px-10 lg:pl-20 lg:pr-16":
                layout === "Horizontal (Text | Image)",
            },
            {
              "lg:w-1/2 px-4 md:px-10 lg:pr-20 lg:pl-16":
                layout === "Horizontal (Image | Text)",
            }
          )}
        >
          <TextPart data={content} layout={layout}/>
        </div>
      </section>
    );
  }

  return (
    //default uiVariant = "standard"
    <Section background={backgroundImage}>
      <div
        className={classNames(
          "w-full flex flex-wrap",
          { "flex-col": layout === "Vertical (Image | Text)" },
          { "flex-col-reverse": layout === "Vertical (Text | Image)" },
          { "flex-row-reverse": layout === "Horizontal (Text | Image)" }
        )}
      >
        <div
          className={classNames("max-w-5xl mx-auto", {
            "w-full lg:w-6/12":
              layout === "Horizontal (Text | Image)" ||
              layout === "Horizontal (Image | Text)",
          })}
        >
          <FlexibleContentMediaPart data={content} />
        </div>
        <div
          className={classNames(
            "pt-5 md:py-5 lg:py-8 flex flex-col mx-auto",
            {
              "lg:w-1/2 md:pr-8 lg:pr-16":
                layout === "Horizontal (Text | Image)",
            },
            {
              "lg:w-1/2 md:pl-8 lg:pl-16":
                layout === "Horizontal (Image | Text)",
            }
          )}
        >
          <TextPart data={content} layout={layout}/>
        </div>
      </div>
    </Section>
  );
};

export default Feature;
