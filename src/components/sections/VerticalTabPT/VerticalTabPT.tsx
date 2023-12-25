"use client";

import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import { Section } from "@/components/elements/Section/Section";
import { Button } from "@/components/elements/Button/Button";
import classNames from "classnames";
import { PresentationType } from "@/helpers/types";
import { RichText2 } from "@/components/elements/RichText/RichText2";
import { MediaCarousel } from "@/components/elements/MediaCarousel/MediaCarousel";
import { MediaItem } from "@/components/elements/MediaItem/MediaItem";
import { FlexibleContentMediaPart } from "@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart";

export const VerticalTabPT: React.FC<{ data: PresentationType }> = ({ data }) => {
  const { label, heading, subheading, content, alignment } = data;
  const [activeItem, setActiveItem] = React.useState(
    content.length > 0 ? content[0].id : ""
  );
  return (
    <Section label={label} heading={heading} subheading={subheading}>
      <RadixTabs.Root
        className="w-full lg:flex"
        defaultValue={content.length > 0 ? content[0].id : ""}
        onValueChange={(value) => setActiveItem(value)}
      >
        <RadixTabs.List
          className="flex flex-col gap-y-3 lg:w-1/4 shrink-0"
          aria-label=""
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
                    {section.label}
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
                      {section.media.length === 1 && (
                        <MediaItem data={section.media[0]} />
                      )}
                      {section.media.length > 1 && (
                        <MediaCarousel
                          data={section.media}
                          autoplay={{
                            delay: 5000,
                          }}
                          navigation={{
                            enabled: false,
                          }}
                        />
                      )}
                    </div>
                  )}
                  <div className="mt-5 flex flex-col gap-2 justify-center pb-8 lg:pr-24">
                    {section.description && (
                      <div className="prose lg:prose-lg">
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
                    <FlexibleContentMediaPart data={section} alignment={alignment} />
                  </div>
                )}
                <div className="mt-5 flex flex-col gap-2 items-center pb-8 lg:pr-24">
                  {section.description && (
                    <div className="prose lg:prose-lg">
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