import classNames from "classnames";
import { Section } from "@/components/elements/Section/Section";
import { ContentPieceType, FeaturedContentType, FeaturedContentLayoutType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import "@/app/css/bg-color.css";
import "@/app/css/padding.css";

const TextPart: React.FC<{ data: ContentPieceType, layout: FeaturedContentLayoutType, darkMode: boolean }> = ({ data, layout, darkMode }) => {
  const { eyebrow, heading, description, buttons  } = data;
  return (
    <>
      {eyebrow && (
        <div
          className={classNames(
            "tracking-widest mb-2 font-semibold",
            { "text-primary-600": !darkMode },
            { "text-primary-500": darkMode },
            {
              "text-center":
                layout === "Vertical (Text | Image)" ||
                layout === "Vertical (Image | Text)",
            }
          )}
        >
          {eyebrow}
        </div>
      )}
      {heading && (
        <div
          className={classNames(
            "text-heading leading-normal font-heading tracking-tight max-w-6xl mb-5",
            { "text-neutral-50": darkMode },
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
      {description && (
        <div
          className={classNames(
            "block prose 2xl:prose-lg ",
            { "prose-invert": darkMode } ,
            {
              "mx-auto":
                layout === "Vertical (Text | Image)" ||
                layout === "Vertical (Image | Text)",
            },
            { "mb-5": buttons && buttons.length > 0 }
          )}
        >
          <RichText2 data={description} />
        </div>
      )}
      {buttons && buttons.length > 0 && (
        <ButtonGroup
          data={buttons}
          alignment={
            layout === "Vertical (Text | Image)" ||
            layout === "Vertical (Image | Text)"
              ? "center"
              : undefined
          }
        />
      )}
    </>
  );
};

export const FeaturedContent: React.FC<{ data: FeaturedContentType }> = ({ data }) => {
  const { htmlid, layout, uiVariant, content, mediaAspectRatio, backgroundColor, backgroundImage, darkMode } = data;
  if (content === null) {
    return null
  }
  if (uiVariant === "extended") {
    return (
      <section
        id={htmlid}
        className={classNames(
          `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
        )}
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
                "lg:w-1/2 px-4 md:px-10 lg:pr-16 xl:pr-24 pl-for-text-image":
                  layout === "Horizontal (Text | Image)",
              },
              {
                "lg:w-1/2 px-4 md:px-10 lg:pl-16 xl:pl-24 pr-for-image-text":
                  layout === "Horizontal (Image | Text)",
              },
            )}
          >
            <TextPart data={content} layout={layout} darkMode={darkMode} />
          </div>
        </div>
      </section>
    );
  }

  return (
    //default uiVariant = "standard"
    <Section
      id={htmlid}
      className={classNames(`${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`)}
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
            "flex flex-col mx-auto",
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
          <TextPart data={content} layout={layout} darkMode={darkMode} />
        </div>
      </div>
    </Section>
  );
};

export default FeaturedContent;