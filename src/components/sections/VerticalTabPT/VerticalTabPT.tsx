'use client'

import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import Section from '@/components/elements/Section/Section';
import Button from '@/components/elements/Button/Button';
import classNames from "classnames";
import { PresentationType } from '@/helpers/types';
import RichText from '@/components/elements/RichText/RichText';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';

const VerticalTabPT: React.FC<{ data: PresentationType }> = ({data}) => {
  const { label, heading, subtitle, content } = data
  const [ activeItem, setActiveItem ] = React.useState(content.length > 0 ? content[0].id : '')
  return (
    <Section label={label} heading={heading} subtitle={subtitle}>
      <RadixTabs.Root
        className="w-full lg:flex lg:gap-10"
        defaultValue={content.length > 0 ? content[0].id : ""}
        onValueChange={(value) => setActiveItem(value)}
      >
        <RadixTabs.List
          className="lg:w-1/3 flex flex-col gap-y-3"
          aria-label=""
        >
          {content.length > 0 &&
            content.map((section) => (
              <>
                <RadixTabs.Trigger
                  key={section.id}
                  value={section.id}
                  className="text-start cursor-pointer px-8 py-4 bg-neutral-100 hover:bg-neutral-200 data-[state='active']:bg-primary-500 data-[state='active']:text-white rounded-assets transition-colors duration-300 ease-in-out"
                >
                  <h4 className="block font-semibold text-xl">
                    <RichText htmlString={section.heading} />
                  </h4>
                </RadixTabs.Trigger>
                <RadixTabs.Content
                  key={section.id}
                  value={section.id}
                  className={classNames("lg:hidden pt-5 transition-all ease-in-out duration-500 relative",
                    { "opacity-100 right-0 z-10": activeItem === section.id },
                    { "opacity-0 -right-24 z-0": activeItem !== section.id }
                  )}
                >
                  {section.media.length > 0 && (
                    <MediaCarousel data={section.media} />
                  )}
                  <div className="mt-5 flex flex-col gap-2 justify-center pb-8 lg:pr-24">
                    <div className="prose lg:prose-lg">
                      <RichText htmlString={section.content} />
                    </div>
                    {section.ctaButton && (
                      <Button
                        key={section.ctaButton?.id}
                        variant={section.ctaButton?.buttonVariant}
                        url={section.ctaButton?.url}
                      >
                        {section.ctaButton?.text}
                      </Button>
                    )}
                  </div>
                </RadixTabs.Content>
              </>
            ))}
        </RadixTabs.List>
        <div className="hidden pt-5 lg:block lg:w-2/3 lg:pt-0">
          {content.map((section) => (
            <RadixTabs.Content
              key={section.id}
              value={section.id}
              className={classNames(
                "text-lg col-start-1 row-start-1 transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0 z-10": activeItem === section.id },
                { "opacity-0 -right-24 z-0": activeItem !== section.id }
              )}
            >
              {section.media.length > 0 && (
                <MediaCarousel data={section.media} />
              )}
              <div className="mt-5 flex flex-col gap-2 justify-center pb-8 lg:pr-24">
                <div className="prose lg:prose-lg">
                  <RichText htmlString={section.content} />
                </div>
                {section.ctaButton && (
                  <div className="mt-5 flex flex-wrap">
                    <Button
                      key={section.ctaButton?.id}
                      variant={section.ctaButton?.buttonVariant}
                      url={section.ctaButton?.url}
                    >
                      {section.ctaButton?.text}
                    </Button>
                  </div>
                )}
              </div>
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    </Section>
  );
}

export default VerticalTabPT