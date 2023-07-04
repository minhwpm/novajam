'use client'

import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import GridBox from '@/components/elements/GridBox/GridBox';
import Button from '@/components/elements/Button/Button';
import classNames from "classnames";
import Image from 'next/image';
import Section from '@/components/elements/Section/Section';
import { ButtonVariant } from '@/components/elements/Button/Button';
import "./styles.css"
interface SectionProps {
  title: string
  label?: string
  subtitle?: string
  content: string
  media: {
    type: string
    src: string
  }
  button?: {
    url: string
    text: string
    type: ButtonVariant
  }
}

interface PresentationProps {
  data: {
    title: string
    label?: string
    subtitle: string
    sections: Array<SectionProps>
  }
}

const TabPT: React.FC<PresentationProps> = ({data}) => {
  const { label, title, subtitle, sections } = data
  const [ activeItem, setActiveItem ] = React.useState(sections ? sections[0].title : '')
  return (
    <Section
      label={label}
      title={title}
      subtitle={subtitle}
    >
      <RadixTabs.Root defaultValue={sections[0].title} onValueChange={(value) => setActiveItem(value)}>
        <RadixTabs.List className="md:flex md:justify-center" aria-label="">
          {sections.map((section,idx) => (
            <RadixTabs.Trigger
              key={section.title}
              value={section.title}
              className="Trigger text-center cursor-pointer border-2"
            >
              <div className={classNames(
                "px-5 pt-3",
                {"border-r border-gray-300": idx < sections.length - 1}
              )}>
                {section.label && (
                  <span className="block uppercase tracking-widest">
                    {section.label}
                  </span>
                )}
                <span className="block font-bold text-2xl pb-2 border-b-[3px] border-transparent">
                  {section.title}
                </span>
                </div>
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>
        <div className="grid mt-16 mb-32">
          {sections.map((section) => (
            <RadixTabs.Content
              key={section.title} value={section.title}
              className={classNames(
                "text-lg col-start-1 row-start-1 transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0 z-10": activeItem === section.title },
                { "opacity-0 -right-24 z-0": activeItem !== section.title }
              )}
            >
              <GridBox columns={2} gap={0}>
                <div className="flex flex-col justify-center p-5 md:p-14 lg:pr-24 bg-primary-50">
                  {section.label && (
                    <p className="text-base uppercase tracking-widest">
                      {section.label}
                    </p>
                  )}
                  <h3 className="text-3xl font-bold mb-6">
                    {section.title}
                  </h3>
                  <p>{section.content}</p>
                  {section.button?.url && (
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" url={section.button.url}>
                        {section.button.text}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center lg:items-start lg:relative lg:top-10 lg:-left-10">
                  <Image
                    src={section.media?.src ?? ''}
                    alt=""
                    width={500}
                    height={500}
                    className="w-full object-cover lg:shadow-lg"
                  />
                </div>
              </GridBox>
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    </Section>
  )
}

export default TabPT