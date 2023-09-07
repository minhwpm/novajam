// Created by minhwpm (minhhien134@gmail.com)
// AccordionPT = Accordion Presentation

'use client'
import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import classNames from "classnames";
import Image from 'next/image';
import "./styles.css"
import Section from '@/components/elements/Section/Section';
import { ButtonVariant } from '@/utils/types';
import RichText from '@/components/elements/RichText/RichText';
import Button from '@/components/elements/Button/Button';

interface SectionProps {
  title: string
  label?: string
  subtitle?: string
  content: string
  media: {
    contentType: string
    url: string
    title: string
  }
  buttons?: Array<{
    url: string
    text: string
    type: ButtonVariant
  }>
}

interface PresentationProps {
  data: {
    title: string
    label?: string
    subtitle: string
    content?: Array<SectionProps>
  }
  variant?: "standard" | "alternate"
}

const AccordionPT: React.FC<PresentationProps> = ({data, variant = "standard"}) => {
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
          className="col-span-12 lg:col-span-5 flex flex-col items-start justify-center gap-6"
        >
          {content?.map((item) => (
            <RadixAccordion.Item
              key={item.title}
              value={item.title}
              className={classNames(
                "Item w-full",
                {"standard rounded-2xl": variant === "standard"},
                {"alternate": variant === "alternate"}
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
                <Image
                  src={item.media?.url ?? ''}
                  alt={item.media?.title ?? item.title}
                  width={500}
                  height={500}
                  className="block lg:hidden mt-6 w-full aspect-4/3 object-cover"
                />
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          ))}
        </RadixAccordion.Root>
        <div className="hidden lg:grid lg:col-span-7">
          {content?.map((item) => (
            <div
              key={item.title}
              className={classNames(
                "TabsContent text-lg col-start-1 row-start-1 flex flex-col gap-5 items-center justify-center transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0": activeItem === item.title },
                { "opacity-0 -right-24": activeItem !== item.title }
              )}
            >
              <Image
                src={item.media?.url ?? ''}
                alt={item.media?.title ?? item.title}
                width={500}
                height={500}
                className="aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default AccordionPT