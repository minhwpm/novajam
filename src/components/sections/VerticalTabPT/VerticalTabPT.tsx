"use client";

import React from "react";
import classNames from "classnames";
import * as RadixTabs from "@radix-ui/react-tabs";
import { Section } from "@/components/elements/Section/Section";
import { Button } from "@/components/elements/Button/Button";
import { ContentPTType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import "@/app/css/bg-color.css";

export const VerticalTabPT: React.FC<{ data: ContentPTType }> = ({ data }) => {
  const { eyebrow, heading, summary, content, alignment, htmlid, backgroundColor, backgroundImage } = data;
  const [activeItem, setActiveItem] = React.useState(
    content.length > 0 ? content[0].id : ""
  );
  return (
    <Section
      id={htmlid}
      className={classNames(`${backgroundColor}-section-bg-color`)}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      backgroundImage={backgroundImage}
    >
      <RadixTabs.Root
        className="w-full lg:flex"
        defaultValue={content.length > 0 ? content[0].id : ""}
        onValueChange={(value) => setActiveItem(value)}
      >
        <RadixTabs.List
          className="flex flex-col gap-y-3 lg:w-1/4 shrink-0"
            aria-label={heading ? documentToHtmlString(heading) : undefined}
        >
          {content.length > 0 &&
            content.map((section) => (
              <div key={section.id} className="flex flex-col">
                <RadixTabs.Trigger
                  value={section.id}
                  className="group text-start cursor-pointer px-8 py-4 bg-neutral-100 hover:bg-neutral-200 data-[state='active']:bg-primary-500 data-[state='active']:text-white rounded-assets transition-colors duration-300 ease-in-out"
                >
                  <div
                    className={classNames(
                      "text-sm font-semibold text-neutral-500 tracking-widest group-data-[state='active']:text-primary-100"
                    )}
                  >
                    {section.eyebrow}
                  </div>
                  {section.heading && (
                    <div className="block font-semibold text-xl">
                      <RichText2 data={section.heading} />
                    </div>
                  )}
                </RadixTabs.Trigger>
                <RadixTabs.Content
                  value={section.id}
                  className={classNames(
                    "lg:hidden pt-5 transition-all ease-in-out duration-500 relative",
                    { "opacity-100 right-0 z-10": activeItem === section.id },
                    { "opacity-0 -right-24 z-0": activeItem !== section.id },
                    { "text-center": alignment === "center" },
                    { "text-end": alignment === "reverse" }
                  )}
                >
                  {section.media.length > 0 && (
                    <div className="w-full">
                      <FlexibleContentMediaPart
                        data={section}
                        alignment={alignment}
                      />
                    </div>
                  )}
                  <div className="mt-5 flex flex-col gap-2 justify-center pb-8 lg:pr-24">
                    {section.description && (
                      <div className="prose 2xl:prose-lg">
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
                </RadixTabs.Content>
              </div>
            ))}
        </RadixTabs.List>
        <div className="hidden pt-5 lg:block lg:pt-0 lg:w-3/4 lg:pl-10 shrink-0">
          {content.map((section) => (
            <RadixTabs.Content
              key={section.id}
              value={section.id}
              className={classNames(
                "text-lg transition-all ease-in-out duration-500 relative",
                { "opacity-100 right-0 z-10": activeItem === section.id },
                { "opacity-0 -right-24 z-0": activeItem !== section.id },
                { "text-center": alignment === "center" },
                { "text-end": alignment === "reverse" }
              )}
            >
              <div className="flex flex-col">
                {(section.media.length > 0 || section.embeddedMediaUrl) && (
                  <div className="shrink-0">
                    <FlexibleContentMediaPart
                      data={section}
                      alignment={alignment}
                    />
                  </div>
                )}
                <div className="mt-5 flex flex-col gap-2 items-center pb-8 lg:pr-24">
                  {section.description && (
                    <div className="prose 2xl:prose-lg">
                      <RichText2 data={section.description} />
                    </div>
                  )}
                  {section.buttons && section.buttons.length > 0 && (
                    <div
                      className={classNames({
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
              </div>
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    </Section>
  );
}