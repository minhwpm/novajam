import Section from "@/components/elements/Section/Section";
import classNames from "classnames";
import Button from "@/components/elements/Button/Button";
import { FeatureType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";

const TextPart: React.FC<{ data: FeatureType }> = ({ data }) => {
  const { label, heading, content, buttons, layout } = data;
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
      <h2
        className={classNames(
          "font-heading text-3xl md:text-4.5xl leading-snug lg:leading-snug font-bold max-w-3xl mb-5",
          {
            "text-center mx-auto":
              layout === "Vertical (Text | Image)" ||
              layout === "Vertical (Image | Text)",
          }
        )}
      >
        <RichText htmlString={heading} />
      </h2>
      <div
        className={classNames("block prose lg:prose-lg", {
          "mx-auto":
            layout === "Vertical (Text | Image)" ||
            layout === "Vertical (Image | Text)",
        })}
      >
        {content && <RichText htmlString={content} />}
      </div>
      {buttons.length > 0 && (
        <div className="mt-10 flex items-center gap-5">
          {buttons.map((button) => (
            <Button
              key={button.id}
              variant={button.buttonVariant}
              url={button.url}
              size="lg"
            >
              {button.text}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

const MediaPart: React.FC<{ data: FeatureType }> = ({ data }) => {
  const { media, mediaAspectRatio } = data;
  if (media.length === 1) {
    return (
      <MediaItem
        data={media[0]}
        aspectRatio={mediaAspectRatio === "16/9" ? "video" : mediaAspectRatio}
      />
    );
  }
  // media.length > 1
  return (
    <MediaCarousel
      data={media}
      aspectRatio={mediaAspectRatio === "16/9" ? "video" : mediaAspectRatio}
    />
  );
};

const Feature: React.FC<{ data: FeatureType }> = ({ data }) => {
  const { media, layout, uiVariant, backgroundImage } = data;
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
          {media.length > 0 && <MediaPart data={data} />}
        </div>
        <div
          className={classNames(
            "w-full pt-4 md:pt-8 lg:pt-16 pb-16 flex flex-col items-center",
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
          <TextPart data={data} />
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
          {media.length > 0 && <MediaPart data={data} />}
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
          <TextPart data={data} />
        </div>
      </div>
    </Section>
  );
};

export default Feature;
