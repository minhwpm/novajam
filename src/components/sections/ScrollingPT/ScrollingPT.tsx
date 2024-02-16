"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { Section } from "@/components/elements/Section/Section";
import { FeatureContentItem } from "@/components/elements/FeatureContentItem/FeatureContentItem";
import { ContentPTType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { Button } from "@/components/elements/Button/Button";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import "@/app/css/bg-color.css";

export const ScrollingPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, alignment, htmlid, backgroundColor, backgroundImage } = data;
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <Section
      id={htmlid}
      className={classNames(`${backgroundColor}-section-bg-color`)}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      backgroundImage={backgroundImage}
    >
      {/* FOR MOBILE, TABLETS */}
      <div className="xl:hidden">
        {content?.map((section) => (
          <div key={section.id} className="mb-20">
            <div
              className={classNames(
                "mb-10",
                { "text-center": alignment === "center" },
                { "text-end": alignment === "reverse" }
              )}
            >
              {section.eyebrow && (
                <div
                  className={classNames(
                    "font-semibold text-neutral-500 tracking-widest"
                  )}
                >
                  {section.eyebrow}
                </div>
              )}
              {section.heading && (
                <div className="font-semibold text-2xl lg:text-3xl leading-snug mb-6">
                  <RichText2 data={section.heading} />
                </div>
              )}
              {section.description && (
                <div className="prose">
                  <RichText2 data={section.description} />
                </div>
              )}
              {section.buttons && section.buttons.length > 0 && (
                <div
                  className={classNames("mt-8", {
                    "flex justify-center": alignment === "center",
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
                  alignment={alignment}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FOR DESKTOP */}
      <div className="hidden xl:flex">
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
                      alignment={alignment}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-2/5 flex flex-col">
          {content?.map((section, idx) => (
            <FeatureContentItem
              key={section.id}
              data={section}
              idx={idx}
              setVisibleIdx={setVisibleIdx}
              alignment={alignment}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}