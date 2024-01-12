import classNames from "classnames";
import { Section } from "@/components/elements/Section/Section";
import { Button } from "@/components/elements/Button/Button";
import { ContentPieceType, FeaturedContentType, FeaturedContentLayoutType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import styles from "./styles.module.css"
import "@/app/css/bg-color.css";

const TextPart: React.FC<{ data: ContentPieceType, layout: FeaturedContentLayoutType }> = ({ data, layout }) => {
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
            "text-heading leading-normal font-heading max-w-3xl mb-5",
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
        <div className="mt-10 flex items-center justify-center gap-5">
          {buttons.map((button) => (
            <Button
              key={button.id}
              variant={button.buttonVariant}
              url={button.url}
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

export const FeaturedContent: React.FC<{ data: FeaturedContentType }> = ({ data }) => {
  const { htmlid, layout, uiVariant, content, mediaAspectRatio, backgroundColor } = data;
  if (content === null) {
    return null
  }
  if (uiVariant === "extended") {
    let paddingStyles = ""
    if (layout === "Horizontal (Image | Text)") {
      paddingStyles = styles["pr-for-image-text"]
    }
    if (layout === "Horizontal (Text | Image)") {
      paddingStyles = styles["pl-for-text-image"]
    }

    return (
      <section
        id={htmlid}
        className={classNames(
          "py-12 lg:py-18",
          `${backgroundColor}-section-bg-color`
        )}
      >
        <div
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
            <FlexibleContentMediaPart data={content} rounded="none" aspectRatio={mediaAspectRatio} />
          </div>
          <div
            className={classNames(
              "w-full pt-4 md:pt-8 lg:pt-16 pb-16 flex flex-col",
              {
                "lg:w-1/2 px-4 md:px-10 lg:pr-16 xl:pr-24":
                  layout === "Horizontal (Text | Image)",
              },
              {
                "lg:w-1/2 px-4 md:px-10 lg:pl-16 xl:pl-24":
                  layout === "Horizontal (Image | Text)",
              },
              paddingStyles
            )}
          >
            <TextPart data={content} layout={layout}/>
          </div>
        </div>
      </section>
    );
  }

  return (
    //default uiVariant = "standard"
    <Section
      id={htmlid}
      className={classNames(`${backgroundColor}-section-bg-color`)}
    >
      <div
        className={classNames(
          "w-full flex flex-wrap",
          { "flex-col gap-y-6": layout === "Vertical (Image | Text)" },
          { "flex-col-reverse gap-y-6": layout === "Vertical (Text | Image)" },
          { "flex-row-reverse": layout === "Horizontal (Text | Image)" }
        )}
      >
        <div
          className={classNames("w-full max-w-5xl mx-auto", {
            "w-full lg:w-6/12":
              layout === "Horizontal (Text | Image)" ||
              layout === "Horizontal (Image | Text)",
          })}
        >
          <FlexibleContentMediaPart
            data={content}
            aspectRatio={mediaAspectRatio}
          />
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
          <TextPart data={content} layout={layout} />
        </div>
      </div>
    </Section>
  );
};

export default FeaturedContent;