"use client";
import React from "react";
import classNames from "classnames";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { Section } from "@/components/elements/Section/Section";
import { ContentPTType } from "@/helpers/types";
import { RichText } from "@/components/elements/RichText/RichText";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { useInView } from "react-hook-inview";
import { ButtonGroup } from "@/components/elements/ButtonGroup/ButtonGroup";
import { FaChevronDown } from "react-icons/fa";
import "@/app/css/bg-color.css";

export const AccordionPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, headingTextAlignment, contentTextAlignment, htmlid, backgroundColor, backgroundImage, darkMode } = data;
  const [ref, isIntersecting] = useInView({
    threshold: 0.4,
    unobserveOnEnter: true,
  });
  return (
    <Section
      id={htmlid}
      className={classNames(
        `${backgroundColor}-${darkMode ? "dark-" : ""}section-bg-color`
      )}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      alignment={headingTextAlignment}
      backgroundImage={backgroundImage}
      darkMode={darkMode}
    >
      <div
        ref={ref}
        className={classNames(
          "w-full flex flex-col gap-10",
          "relative -bottom-10 opacity-0",
          {
            "animate-slidingUpContent animation-delay-300": isIntersecting,
          }
        )}
      >
        <RadixAccordion.Root
          type="multiple"
          className={classNames(
            "w-full lg:w-[800px] mx-auto flex flex-col items-start justify-center gap-6"
          )}
        >
          {content &&
            content.length > 0 &&
            content.map((section) => (
              <RadixAccordion.Item
                key={section.id}
                value={section.id}
                className={classNames(
                  "group w-full rounded-assets data-[state=closed]:border data-[state=closed]:hover:bg-primary-500 data-[state=closed]:hover:text-neutral-100 hover:border-primary-500",
                  { "text-neutral-50": darkMode }
                )}
              >
                <RadixAccordion.Trigger asChild>
                  <div className="py-4 px-6 cursor-pointer flex gap-3 rounded-t-assets data-[state=closed]:text-primary-600 data-[state=closed]:hover:text-white data-[state=open]:bg-primary-600 data-[state=open]:border-primary-600 data-[state=open]:text-white">
                    <div className="flex-1 flex flex-col">
                      {section.eyebrow && (
                        <div
                          className={classNames(
                            "text-sm font-medium tracking-widest",
                            { "text-neutral-500": !darkMode },
                            { "text-neutral-200": darkMode }
                          )}
                        >
                          {section.eyebrow}
                        </div>
                      )}
                      {section.heading && (
                        <div
                          className={classNames("font-semibold text-xl", {
                            "text-neutral-50": darkMode,
                          })}
                        >
                          <RichText data={section.heading} />
                        </div>
                      )}
                    </div>
                    <FaChevronDown
                      size={20}
                      className={classNames(
                        "inline-block shrink-0 mt-1 transition-transform duration-500 group-data-[state=open]:rotate-180",
                        { "text-neutral-50": darkMode }
                      )}
                    />
                  </div>
                </RadixAccordion.Trigger>
                <RadixAccordion.Content
                  className={classNames(
                    "overflow-hidden px-6 rounded-b-assets",
                    "data-[state=closed]:animate-accordionSlideUp",
                    "data-[state=open]:animate-accordionSlideDown data-[state=open]:border data-[state=open]:border-primary-600",
                    { "text-center": contentTextAlignment === "center" },
                    { "text-end": contentTextAlignment === "end" }
                  )}
                >
                  <div className="pt-4 pb-8">
                    {(section.media.length > 0 || section.embeddedMediaUrl) && (
                      <div className="max-w-xl mx-auto mt-10">
                        <FlexibleContentMediaPart
                          data={section}
                          alignment={contentTextAlignment}
                        />
                      </div>
                    )}
                    {section.description && (
                      <div
                        className={classNames("prose xl:prose-lg max-w-none group-data-[state=closed]:text-transparent", {
                          "text-neutral-100": darkMode,
                        })}
                      >
                        <RichText data={section.description} />
                      </div>
                    )}
                    {section.buttons && section.buttons.length > 0 && (
                      <div className={classNames("mt-8")}>
                        <ButtonGroup
                          data={section.buttons}
                          alignment={contentTextAlignment}
                        />
                      </div>
                    )}
                  </div>
                </RadixAccordion.Content>
              </RadixAccordion.Item>
            ))}
        </RadixAccordion.Root>
      </div>
    </Section>
  );
}