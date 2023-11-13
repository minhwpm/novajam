'use client'

import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import Section from '@/components/elements/Section/Section';
import Button from '@/components/elements/Button/Button';
import classNames from "classnames";
import { PresentationType } from '@/helpers/types';
import RichText from '@/components/elements/RichText/RichText';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';

const TabPT: React.FC<{ data: PresentationType }> = ({data}) => {
  const { label, heading, subtitle, content, alignment } = data
  const [ activeItem, setActiveItem ] = React.useState(content.length > 0 ? content[0].id : '')
  return (
    <Section label={label} heading={heading} subtitle={subtitle}>
      <RadixTabs.Root
        className="w-full"
        defaultValue={content.length > 0 ? content[0].id : ""}
        onValueChange={(value) => setActiveItem(value)}
      >
        <RadixTabs.List
          className="flex lg:justify-center overflow-x-auto"
          aria-label=""
        >
          {content.length > 0 &&
            content.map((section, idx) => (
              <RadixTabs.Trigger
                key={section.id}
                value={section.id}
                className="group shrink-0 text-center cursor-pointer data-[state='inactive']:opacity-60"
              >
                <div
                  className={classNames("px-5 pt-3", {
                    "border-r border-gray-300": idx < content.length - 1,
                  })}
                >
                  <div className={classNames("text-sm tracking-widest text-neutral-500 font-semibold")}>
                    {section.label}
                  </div>
                  <div className="block font-bold text-2xl pb-2 underline-hover-effect group-data-[state='active']:before:w-full group-data-[state='active']:before:bg-primary-500">
                    <RichText htmlString={section.heading} />
                  </div>
                </div>
              </RadixTabs.Trigger>
            ))}
        </RadixTabs.List>
        <div className="mt-16">
          {content.map((section) => (
            <RadixTabs.Content
              key={section.id}
              value={section.id}
              className={classNames(
                "text-lg col-start-1 row-start-1 transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0 z-10": activeItem === section.id },
                { "opacity-0 -right-24 z-0": activeItem !== section.id },
                { "text-center": alignment === "center" },
                { "text-end": alignment === "reverse" }
              )}
            >
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col gap-2 justify-center pb-8 lg:pr-24">
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
                        >
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                {section.media.length > 0 && (
                  <MediaCarousel data={section.media} />
                )}
              </div>
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    </Section>
  );
}

export default TabPT