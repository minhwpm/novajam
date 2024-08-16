"use client";
import React, { useState } from "react";
import classNames from "classnames";
import { Section } from "@/components/elements/Section/Section";
import { TextAlignmentType, ContentPTType, FlexibleContentType } from "@/lib/types";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { useInView } from "react-hook-inview";
import { TextPartPT } from "@/components/elements/TextPartPT/TextPartPT";
import "@/app/styles/bg-color.css";

const TextContent = ({
  data,
  idx,
  setVisibleIdx,
  alignment,
  darkMode
}: {
  data: FlexibleContentType;
  idx: number;
  setVisibleIdx: (idx: number) => void;
  alignment: TextAlignmentType;
  darkMode: boolean
}) => {
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
      <TextPartPT 
        data={data}
        alignment={alignment}
        darkMode={darkMode}
      />
    </div>
  );
};

export const ScrollPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, headingTextAlignment, contentTextAlignment, htmlid, backgroundColor, backgroundImage, darkMode } = data;
  const [visibleIdx, setVisibleIdx] = useState(0);
  return (
    <Section
      id={htmlid}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      alignment={headingTextAlignment}
      backgroundColor={backgroundColor}
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
              <TextPartPT
                data={section}
                alignment={contentTextAlignment}
                darkMode={darkMode}
              />
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