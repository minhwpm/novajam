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
  const [ activeItem, setActiveItem ] = React.useState(content ? content[0].title : '')
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <div className="w-full grid grid-cols-12 gap-10 lg:max-h-[80vh]">
        <RadixAccordion.Root
          type="single"
          defaultValue={content && content[0].title}
          onValueChange={(value) => setActiveItem(value)}
          className={classNames(
            "col-span-12 lg:col-span-6 flex flex-col items-start justify-center gap-6",
          )}
        >
          {content?.map((item) => (
            <RadixAccordion.Item
              key={item.title}
              value={item.title}
              className={classNames(
                "w-full border-l-4 border-l-transparent",
                "data-[state=open]:border-l-primary-500",
                "data-[state=closed]:hover:bg-neutral-100"
              )}
            >
              <RadixAccordion.Trigger
                key={item.title}
                value={item.title}
                asChild
              >
                <div className="TabsTrigger py-4 px-6 cursor-pointer rounded-xl ">
                  {item.label && (
                    <p className="block uppercase tracking-widest">
                      {item.label}
                    </p>
                  )}
                  <h3 className="block font-semibold text-2xl">
                    {item.title}
                  </h3>
                </div>
              </RadixAccordion.Trigger>
              <RadixAccordion.Content className='Content px-6'>
                <div className="block text-lg">
                  <RichText htmlString={item.content} />
                </div>
                <div className="mt-6 flex justify-end">
                {item.buttons && item.buttons?.map(button => (
                  <Button key={button.text} variant={button.type ?? "alternate"} url={button.url}>
                    {button.text}
                  </Button>
                ))}
                </div>
                { item.media.length > 0 && <MediaCarousel data={item.media} /> }
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          ))}
        </RadixAccordion.Root>
        <div className="hidden lg:col-span-6">
          {content?.map((item) => (
            <div
              key={item.title}
              className={classNames(
                "TabsContent text-lg col-start-1 row-start-1 flex flex-col gap-5 items-center justify-center transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0": activeItem === item.title },
                { "opacity-0 -right-24": activeItem !== item.title }
              )}
            >
              <MediaCarousel data={item.media} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default AccordionPT