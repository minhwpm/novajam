"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { Section } from "@/components/elements/Section/Section";
import { TextAlignmentType, ContentPTType, ContentPieceType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { Button } from "@/components/elements/Button/Button";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { useInView } from "react-hook-inview";
import "@/app/css/bg-color.css";

const TextContent = ({
  data,
  idx,
  setVisibleIdx,
  alignment,
  darkMode
}: {
  data: ContentPieceType;
  idx: number;
  setVisibleIdx: (idx: number) => void;
  alignment: TextAlignmentType;
  darkMode: boolean
}) => {
  const { eyebrow, heading, description } = data;
  const [ref, isVisible] = useInView({
    threshold: 0.9,
    onEnter: () => setVisibleIdx(idx),
  });
  return (
    <div
      ref={ref}
      className={classNames(
        "py-[20vh] px-10 transition-opacity duration-300 flex flex-col",
        { "is-visible opacity-100": isVisible },
        { "is-invisible opacity-10": !isVisible },
        { "text-center": alignment === "center" },
        { "text-end": alignment === "end" }
      )}
    >
      {eyebrow && (
        <div
          className={classNames(
            "tracking-widest text-sm font-medium",
            { "text-neutral-500": !darkMode },
            { "text-neutral-200": darkMode }
          )}
        >
          {eyebrow}
        </div>
      )}
      {heading && (
        <div
          className={classNames(
            "text-2xl lg:text-3xl",
            {
              "mt-2": eyebrow,
            },
            { "text-neutral-50": darkMode }
          )}
        >
          <RichText2 data={heading} />
        </div>
      )}
      {description && (
        <div
          className={classNames("prose xl:prose-lg mt-6", {
            "text-neutral-100": darkMode,
          })}
        >
          <RichText2 data={description} />
        </div>
      )}
    </div>
  );
};

export const ScrollPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, headingTextAlignment, contentTextAlignment, htmlid, backgroundColor, backgroundImage, darkMode } = data;
  const [visibleIdx, setVisibleIdx] = useState(0);
  return (
    <Section
      id={htmlid}
      className={classNames(`${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`)}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      alignment={headingTextAlignment}
      backgroundImage={backgroundImage}
      darkMode={darkMode}
    >
      {/* FOR MOBILE, TABLETS */}
      <div className="lg:hidden">
        {content?.map((section) => (
          <div key={section.id} className="mb-20">
            <div
              className={classNames(
                "flex flex-col mb-10",
                { "text-center": contentTextAlignment === "center" },
                { "text-end": contentTextAlignment === "end" }
              )}
            >
              {section.eyebrow && (
                <div
                  className={classNames(
                    "tracking-widest text-sm font-medium",
                    { "text-neutral-500": !darkMode },
                    { "text-neutral-200": darkMode }
                  )}
                >
                  {section.eyebrow}
                </div>
              )}
              {section.heading && (
                <div
                  className={classNames(
                    "text-2xl lg:text-3xl leading-snug",
                    { "mt-2": section.eyebrow },
                    { "text-neutral-50": darkMode },
                  )}
                >
                  <RichText2 data={section.heading} />
                </div>
              )}
              {section.description && (
                <div className={classNames("prose mt-6",
                  { "text-neutral-50": darkMode}
                )}>
                  <RichText2 data={section.description} />
                </div>
              )}
              {section.buttons && section.buttons.length > 0 && (
                <div
                  className={classNames("mt-8", {
                    "flex justify-center": contentTextAlignment === "center",
                  })}
                >
                  {section.buttons.map((button) => (
                    <Button
                      key={button.id}
                      url={button.url}
                      variant={button.buttonVariant}
                      openNewTab={button.openNewTab}
                    >
                      {button.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <div className="md:w-3/5 mx-auto">
              {section.media?.length > 0 && (
                <FlexibleContentMediaPart
                  data={section}
                  alignment={contentTextAlignment}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FOR DESKTOP */}
      <div className="hidden lg:flex">
        <div className="relative w-3/5">
          <div className="sticky top-20">
            <div className="relative h-[80vh]">
              {content?.map((section, idx) => (
                <div
                  key={section.id}
                  className={classNames(
                    "transition-opacity duration-300",
                    {
                      "is-visible opacity-100 h-full overflow-visible ":
                        visibleIdx === idx,
                    },
                    {
                      "is-invisible h-0 opacity-10 max-h-full relative overflow-hidden":
                        visibleIdx !== idx,
                    }
                  )}
                >
                  {(section.media.length > 0 || section.embeddedMediaUrl) && (
                    <FlexibleContentMediaPart
                      data={section}
                      alignment={contentTextAlignment}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {content?.map((section, idx) => (
            <TextContent
              key={section.id}
              data={section}
              idx={idx}
              setVisibleIdx={setVisibleIdx}
              alignment={contentTextAlignment}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}