'use client'

import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import Section from '@/components/elements/Section/Section';
import Button from '@/components/elements/Button/Button';
import classNames from "classnames";
import { ButtonVariant, PresentationType } from '@/utils/types';
import RichText from '@/components/elements/RichText/RichText';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';

const TabPT: React.FC<{ data: PresentationType }> = ({data}) => {
  const { label, title, subtitle, content } = data
  const [ activeItem, setActiveItem ] = React.useState(content ? content[0].title : '')
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <RadixTabs.Root className="w-full" defaultValue={content[0].title} onValueChange={(value) => setActiveItem(value)}>
        <RadixTabs.List className="flex lg:justify-center overflow-x-auto" aria-label="">
          {content.map((section,idx) => (
            <RadixTabs.Trigger
              key={section.title}
              value={section.title}
              className="group shrink-0 text-center cursor-pointer data-[state='inactive']:opacity-60"
            >
              <div className={classNames(
                "px-5 pt-3",
                {"border-r border-gray-300": idx < content.length - 1}
              )}>
                {section.label && (
                  <p className="block uppercase tracking-widest">
                    {section.label}
                  </p>
                )}
                <h3 className="block font-bold text-2xl pb-2 underline-hover-effect group-data-[state='active']:before:w-full group-data-[state='active']:before:bg-primary-500">
                  {section.title}
                </h3>
              </div>
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>
        <div className="mt-16 mb-32">
          {content.map((section) => (
            <RadixTabs.Content
              key={section.title} value={section.title}
              className={classNames(
                "text-lg col-start-1 row-start-1 transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0 z-10": activeItem === section.title },
                { "opacity-0 -right-24 z-0": activeItem !== section.title }
              )}
            >
              <div className="grid lg:grid-cols-2">
                <div className="flex flex-col lg:pr-24 prose lg:prose-lg">
                  <RichText htmlString={section.content} />
                  {section.buttons.length > 0 && (
                    <div className="mt-6 flex justify-end">
                      {section.buttons.map(button => (
                        <Button key={button.id} variant={button.type} url={button.url}>
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                { section.media.length > 0 && 
                  <div className="flex flex-col items-center lg:items-start">
                    <MediaCarousel data={section.media} />
                  </div>
                }
              </div>
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    </Section>
  )
}

export default TabPT