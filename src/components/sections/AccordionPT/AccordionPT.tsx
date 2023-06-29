// Created by minhwpm (minhhien134@gmail.com)
// AccordionPT = Accordion Presentation

'use client'
import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import classNames from "classnames";
import Image from 'next/image';
import "./styles.css"

interface TabsProps {
  data?: Array<{
    label?: string
    title: string
    subtitle?: string
    content: string
    media?: {
      type: string
      src: string
    }
    url?: string
  }>
}

const VTabs = ({data}: TabsProps) => {
  const [ activeItem, setActiveItem ] = React.useState(data ? data[0].title : '')
  if (data && data.length > 0) {
    return (
      <div className="grid grid-cols-12">
        <RadixAccordion.Root
          type="single"
          defaultValue={data[0].title}
          onValueChange={(value) => setActiveItem(value)}
          className="col-span-12 lg:col-span-5 flex flex-col items-start gap-6"
        >
          {data.map((item) => (
            <RadixAccordion.Item
              key={item.title}
              value={item.title}
              className="Item rounded-2xl w-full"
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
                <p className=" block text-lg">
                  {item.content}
                </p>
                <Image
                  src={item.media?.src ?? ''}
                  alt=""
                  width={500}
                  height={500}
                  className="block lg:hidden mt-6 h-full object-cover"
                />
              </RadixAccordion.Content>
            </RadixAccordion.Item>
          ))}
        </RadixAccordion.Root>
        <div className="hidden lg:grid lg:col-span-7">
          {data.map((item) => (
            <div
              key={item.title}
              className={classNames(
                "TabsContent text-lg col-start-1 row-start-1 flex flex-col gap-5 items-center justify-center transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0": activeItem === item.title },
                { "opacity-0 -right-24": activeItem !== item.title }
              )}
            >
              <Image
                src={item.media?.src ?? ''}
                alt=""
                width={500}
                height={500}
                className="h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
  return <></>
}

export default VTabs