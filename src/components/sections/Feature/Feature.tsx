import Section from "@/components/elements/Section/Section";
import classNames from "classnames";
import Button from "@/components/elements/Button/Button";
import { FeatureType } from "@/utils/types";
import RichText from "@/components/elements/RichText/RichText";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";

interface FeatureProps {
  data: FeatureType;
}

const TextPart: React.FC<FeatureProps> = ({ data }) => {
  const { label, heading, content, buttons, layout } = data;
  return (
    <>
      {label && (
        <p
          className={classNames(
            "uppercase tracking-widest mb-2 text-secondary-500 font-semibold",
            {
              "text-center":
                layout === "Column [ Text | Image ]" ||
                layout === "Column [ Image | Text ]",
            }
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={classNames(
          "font-heading text-3xl md:text-3xl lg:text-5xl leading-snug lg:leading-snug font-bold max-w-3xl mb-5",
          {
            "text-center mx-auto":
              layout === "Column [ Text | Image ]" ||
              layout === "Column [ Image | Text ]",
          }
        )}
      >
        <RichText htmlString={heading} />
      </h2>
      <div
        className={classNames("block prose lg:prose-lg", {
          "mx-auto":
            layout === "Column [ Text | Image ]" ||
            layout === "Column [ Image | Text ]",
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
  )
}

const MediaPart: React.FC<FeatureProps> = ({ data }) => {
  const { media, layout, uiVariant } = data
  return (
    <MediaCarousel
      data={media}
      aspectRatio={classNames(
        {
          "aspect-video":
            uiVariant === "standard" &&
            (layout === "Column [ Text | Image ]" ||
              layout === "Column [ Image | Text ]"),
        },
        {
          "aspect-4/3":
            uiVariant === "standard" &&
            (layout === "Row [ Text | Image ]" ||
            layout === "Row [ Image | Text ]"),
        }
      )}
    />
  );
}

const Feature: React.FC<FeatureProps> = ({ data }) => {
  const { media, layout, uiVariant } = data;
  if (uiVariant === "extended") {
    return (
      <section
        className={classNames(
          "relative flex flex-wrap",
          { "flex-row-reverse": layout === "Row [ Text | Image ]" },
          { "flex-col": layout === "Column [ Image | Text ]" },
          { "flex-col-reverse": layout === "Column [ Text | Image ]" }
        )}
      >
        <div
          className={classNames("w-full", {
            "lg:w-6/12":
              layout === "Row [ Text | Image ]" ||
              layout === "Row [ Image | Text ]",
          })}
        >
          {media.length > 0 && <MediaPart data={data} />}
        </div>
        <div
          className={classNames(
            "container mx-auto px-4",
            {
              "lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2":
                layout === "Row [ Text | Image ]",
            },
            { "lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2": layout === "Row [ Image | Text ]" }
          )}
        >
          <div
            className={classNames(
              "w-full py-5 md:py-8",
              { "lg:w-1/2 md:pr-8 lg:pr-16": layout === "Row [ Text | Image ]" },
              { "lg:w-1/2 md:pl-8 lg:pl-16": layout === "Row [ Image | Text ]" }
            )}
          >
            <TextPart data={data} />
          </div>
        </div>
      </section>
    );
  }
  
  return (
    //default uiVariant = "standard"
    <Section>
      <div
        className={classNames(
          "w-full flex flex-wrap",
          { "flex-col": layout === "Column [ Image | Text ]" },
          { "flex-col-reverse": layout === "Column [ Text | Image ]" },
          { "flex-row-reverse": layout === "Row [ Text | Image ]" }
        )}
      >
        <div
          className={classNames("max-w-5xl mx-auto", {
            "w-full lg:w-6/12":
              layout === "Row [ Text | Image ]" ||
              layout === "Row [ Image | Text ]",
          })}
        >
          {media.length > 0 && <MediaPart data={data} />}
        </div>
        <div
          className={classNames(
            "pt-5 md:py-5 lg:py-8 flex flex-col",
            { "lg:w-1/2 md:pr-8 lg:pr-16": layout === "Row [ Text | Image ]" },
            { "lg:w-1/2 md:pl-8 lg:pl-16": layout === "Row [ Image | Text ]" }
          )}
        >
          <TextPart data={data} />
        </div>
      </div>
    </Section>
  );
};

export default Feature;
