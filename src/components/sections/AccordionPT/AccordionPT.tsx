"use client";
import React from "react";
import classNames from "classnames";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { Section } from "@/components/elements/Section/Section";
import { ContentPTType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText";
import { Button } from "@/components/elements/Button/Button";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import "@/app/css/bg-color.css";

export const AccordionPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, headingTextAlignment, contentTextAlignment, htmlid, backgroundColor, backgroundImage, darkMode } = data;
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
      <div className="w-full flex flex-col gap-10">
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
                  "group w-full rounded-assets bg-white border data-[state=closed]:hover:bg-primary-600 data-[state=closed]:hover:text-neutral-100 hover:border-primary-600 transition-colors duration-300 ease-in-out",
                  { "bg-opacity-5 text-neutral-50": darkMode}
                )}
              >
                <RadixAccordion.Trigger asChild>
                  <div className="py-4 px-6 cursor-pointer flex gap-3 items-center rounded-t-assets data-[state=open]:bg-primary-600 data-[state=open]:text-white">
                    <div className="flex-1 flex flex-col items-center">
                      <div
                        className={classNames(
                          "text-sm font-medium tracking-widest",
                          { "text-neutral-500": !darkMode },
                          { "text-neutral-200": darkMode },
                        )}
                      >
                        {section.eyebrow}
                      </div>
                      {section.heading && (
                        <div className={classNames("font-semibold text-xl",
                          { "text-neutral-50": darkMode },
                        )}>
                          <RichText2 data={section.heading} />
                        </div>
                      )}
                    </div>
                    <AiOutlinePlus
                      size={25}
                      className="group-data-[state=open]:hidden shrink-0"
                    />
                    <AiOutlineMinus
                      size={25}
                      className="group-data-[state=closed]:hidden shrink-0"
                    />
                  </div>
                </RadixAccordion.Trigger>
                <RadixAccordion.Content
                  className={classNames(
                    "overflow-hidden px-4 lg:px-10",
                    "data-[state=closed]:animate-accordionSlideUp",
                    "data-[state=open]:animate-accordionSlideDown",
                    { "text-center": contentTextAlignment === "center" },
                    { "text-end": contentTextAlignment === "end" }
                  )}
                >
                  <div className="pt-4 pb-8">
                    {section.description && (
                      <div className={classNames("prose xl:prose-lg max-w-none",
                        { "text-neutral-100": darkMode },
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
                    {(section.media.length > 0 || section.embeddedMediaUrl) && (
                      <div className="max-w-xl mx-auto mt-10">
                        <FlexibleContentMediaPart
                          data={section}
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