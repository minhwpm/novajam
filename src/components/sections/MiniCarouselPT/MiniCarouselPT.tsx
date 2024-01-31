"use client";
import classNames from "classnames";
import React, { useState } from "react";
import { Section } from "@/components/elements/Section/Section";
import { ContentPTType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/elements/Button/Button";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import "@/app/css/bg-color.css";

interface ArrowGroupProps {
  visibleIdx: number;
  setVisibleIdx: (idx: number) => void;
  length: number;
}

const ArrowGroup = ({ visibleIdx, setVisibleIdx, length }: ArrowGroupProps) => {
  return (
    <>
      <IoIosArrowBack
        className="cursor-pointer flex justify-center items-center rounded-assets w-14 h-14 p-2 hover:bg-primary-200 bg-opacity-80 transition-colors duration-500 ease"
        onClick={() => {
          if (visibleIdx > 0) setVisibleIdx(visibleIdx - 1);
          else setVisibleIdx(length - 1);
        }}
      />
      <IoIosArrowForward
        className="cursor-pointer flex justify-center items-center rounded-assets w-14 h-14 p-2 hover:bg-primary-200 bg-opacity-80 transition-colors duration-500 ease"
        onClick={() => {
          if (visibleIdx < length - 1) setVisibleIdx(visibleIdx + 1);
          else setVisibleIdx(0);
        }}
      />
    </>
  );
};

export const MiniCarouselPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, alignment, htmlid, backgroundColor, backgroundImage } = data;
  const [visibleIdx, setVisibleIdx] = useState(0);

  return (
    <Section
      id={htmlid}
      className={classNames("overflow-x-hidden", `${backgroundColor}-section-bg-color`)}
      backgroundImage={backgroundImage}
    >
      <div className="flex flex-col lg:flex-row gap-5 lg:py-10">
        <div className="lg:w-1/2 lg:pr-10">
          {eyebrow && (
            <p className="uppercase tracking-widest text-primary-600 font-semibold mb-2">
              {eyebrow}
            </p>
          )}
          {heading && (
            <div className="font-heading text-heading leading-tight mb-3">
              <RichText2 data={heading} />
            </div>
          )}
          {summary && (
            <div className="prose md:prose-lg lg:prose-xl mb-3 max-w-xl lg:max-w-3xl">
              <RichText2 data={summary} />
            </div>
          )}
          <div className="mt-8 hidden lg:flex gap-4">
            <ArrowGroup
              visibleIdx={visibleIdx}
              setVisibleIdx={setVisibleIdx}
              length={content.length}
            />
          </div>
        </div>
        <div className="lg:w-1/2 grid">
          {content.map((section, idx) => (
            <div
              key={section.id}
              className={classNames(
                "col-start-1 row-start-1 flex flex-col gap-6 p-8 lg:p-12 shadow-lg bg-white bg-opacity-80 rounded-assets transition-all ease-in-out duration-500 relative",
                { "items-center": alignment === "center" },
                { "items-end": alignment === "reverse" },
                { "opacity-100 right-0": visibleIdx == idx },
                { "opacity-0 -right-24": visibleIdx != idx }
              )}
            >
              {(section.media.length > 0 || section.embeddedMediaUrl) && (
                <FlexibleContentMediaPart data={section} alignment={alignment} />
              )}
              <div
                className={classNames(
                  "grow flex flex-col justify-center",
                  { "text-center": alignment === "center" },
                  { "text-end": alignment === "reverse" }
                )}
              >
                <div className={classNames("text-sm font-semibold text-neutral-500 tracking-widest")}>
                  {section.eyebrow}
                </div>
                {section.heading && (
                  <div className={classNames("text-2xl font-semibold ")}>
                    <RichText2 data={section.heading} />
                  </div>
                )}
                {section.description && (
                  <div className="prose 2xl:prose-lg mt-5">
                    <RichText2 data={section.description} />
                  </div>
                )}
                {section.buttons && section.buttons.length > 0 && (
                  <div
                    className={classNames("mt-8", {
                      "flex justify-center": alignment === "center",
                    })}
                  >
                    {section.buttons.map(button => (
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
            </div>
          ))}
        </div>
        <div className="flex lg:hidden gap-4 mt-2 justify-center">
          <ArrowGroup
            visibleIdx={visibleIdx}
            setVisibleIdx={setVisibleIdx}
            length={content.length}
          />
        </div>
      </div>
    </Section>
  );
}