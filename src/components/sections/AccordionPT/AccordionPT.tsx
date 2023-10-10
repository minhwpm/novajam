// Created by minhwpm (minhhien134@gmail.com)
// AccordionPT = Accordion Presentation

'use client'
import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import classNames from "classnames";
import Section from '@/components/elements/Section/Section';
import { PresentationType } from '@/utils/types';
import RichText from '@/components/elements/RichText/RichText';
import Button from '@/components/elements/Button/Button';
import { MediaCarousel } from '@/components/elements/MediaCarousel/MediaCarousel';
import "./styles.css"

const AccordionPT: React.FC<{ data: PresentationType }> = ({data}) => {
  const { label, title, subtitle, content } = data
  const [ activeItem, setActiveItem ] = React.useState(content.length > 0 ? content[0]?.title : "")
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <div className="w-full grid grid-cols-12 gap-10 lg:max-h-[80vh]">
        <RadixAccordion.Root
          type="single"
          defaultValue={content.length > 0 ? content[0].title : ""}
          onValueChange={(value) => setActiveItem(value)}
          className={classNames(
            "col-span-12 lg:col-span-6 flex flex-col items-start justify-center gap-6",
          )}
        >
          {content.length > 0 && content.map((section) => (
            <RadixAccordion.Item
              key={section.title}
              value={section.title}
              className={classNames(
                "w-full border-l-4 border-l-transparent",
                "data-[state=open]:border-l-primary-500",
                "data-[state=closed]:hover:bg-neutral-100"
              )}
            >
              <RadixAccordion.Trigger
                key={section.title}
                value={section.title}
                asChild
              >
                <div className="py-4 px-6 cursor-pointer rounded-xl ">
                  <h3 className="block font-semibold text-2xl">
                    {section.title}
                  </h3>
                </div>
              </RadixAccordion.Trigger>
              <RadixAccordion.Content className='Content px-6'>
                <div className="prose lg:prose-lg">
                  <RichText htmlString={section.content} />
                </div>
                <div className="my-3 flex justify-end">
                  <Button key={section.ctaButton?.id} variant={section.ctaButton?.buttonVariant} url={section.ctaButton?.url}>
                    {section.ctaButton?.text}
                  </Button>
                </div>
                { section.media.length > 0 && 
                  <div className="lg:hidden">
                    <MediaCarousel data={section.media} /> 
                  </div>
                }
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          ))}
        </RadixAccordion.Root>
        <div className="hidden lg:grid lg:col-span-6">
          {content?.map((section) => (
            <div
              key={section.title}
              className={classNames(
                "text-lg col-start-1 row-start-1 transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0": activeItem === section.title },
                { "opacity-0 -right-24": activeItem !== section.title }
              )}
            >
              <MediaCarousel data={section.media} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default AccordionPT