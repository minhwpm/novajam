// Created by minhwpm (minhhien134@gmail.com)
// AccordionPT = Accordion Presentation

"use client";
import React from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import classNames from "classnames";
import Section from "@/components/elements/Section/Section";
import { PresentationType } from "@/helpers/types";
import RichText from "@/components/elements/RichText/RichText";
import Button from "@/components/elements/Button/Button";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

const AccordionPT: React.FC<{ data: PresentationType }> = ({ data }) => {
  const { label, heading, subheading, content, alignment } = data;
  return (
    <Section label={label} heading={heading} subheading={subheading}>
      <div className="w-full flex flex-col gap-10">
        <RadixAccordion.Root
          type="multiple"
          className={classNames(
            "w-full lg:w-[800px] mx-auto flex flex-col items-start justify-center gap-6"
          )}
        >
          {content.length > 0 &&
            content.map((section) => (
              <RadixAccordion.Item
                key={section.id}
                value={section.id}
                className={classNames(
                  "group w-full rounded-assets border shadow data-[state=closed]:hover:bg-primary-50 data-[state=closed]:hover:text-primary-500 transition-colors duration-300 ease-in-out",
                )}
              >
                <RadixAccordion.Trigger asChild>
                  <div className="py-4 px-6 cursor-pointer flex gap-3 items-center rounded-t-assets data-[state=open]:bg-primary-500 data-[state=open]:text-white">
                    <div className="flex-1 flex flex-col items-center">
                      <div className={classNames("text-sm font-semibold tracking-widest")}>
                        {section.label}
                      </div>
                      <div className="font-semibold text-xl">
                        <RichText htmlString={section.heading} />
                      </div>
                    </div>
                    <AiOutlinePlus size={25} className="group-data-[state=open]:hidden shrink-0" />
                    <AiOutlineMinus size={25} className="group-data-[state=closed]:hidden shrink-0" />
                  </div>
                </RadixAccordion.Trigger>
                <RadixAccordion.Content className={classNames("overflow-hidden px-4 lg:px-10 pt-5 pb-10",
                  "data-[state=closed]:animate-accordionSlideUp",
                  "data-[state=open]:border-t data-[state=open]:animate-accordionSlideDown",
                  { "text-center": alignment === "center" },
                  { "text-end": alignment === "reverse" }
                )}>
                  
                  <div className="prose lg:prose-lg">
                    <RichText htmlString={section.content} />
                  </div>
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
                  {section.media.length > 0 && (
                    <div className="max-w-xl mx-auto mt-10">
                      <MediaCarousel data={section.media} />
                    </div>
                  )}
                </RadixAccordion.Content>
              </RadixAccordion.Item>
            ))}
        </RadixAccordion.Root>
      </div>
    </Section>
  );
};

export default AccordionPT;
