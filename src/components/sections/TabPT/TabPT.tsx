'use client'

import React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import GridBox from '@/components/elements/GridBox/GridBox';
import Button from '@/components/elements/Button/Button';
import classNames from "classnames";
import Image from 'next/image';
import "./styles.css"
interface Props {
  data?: Array<{
    label?: string
    title: string
    subtitle?: string
    content: string
    media?: {
      type: string
      src: string
    }
    link?: {
      text: string
      url: string
    }
  }>
}

const TabPT = ({data}: Props) => {
  const [ activeItem, setActiveItem ] = React.useState(data ? data[0].title : '')
  if (data && data.length > 0) {
    return (
      <RadixTabs.Root defaultValue={data[0].title} onValueChange={(value) => setActiveItem(value)}>
        <RadixTabs.List className="md:flex md:justify-center" aria-label="">
          {data.map((item,idx) => (
            <RadixTabs.Trigger
              key={item.title}
              value={item.title}
              className="Trigger text-center cursor-pointer border-2"
            >
              <div className={classNames(
                "px-5 pt-3",
                {"border-r border-gray-300": idx < data.length - 1}
              )}>
                {item.label && (
                  <span className="block uppercase tracking-widest">
                    {item.label}
                  </span>
                )}
                <span className="block font-bold text-2xl pb-2 border-b-[3px] border-transparent">
                  {item.title}
                </span>
                </div>
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>
        <div className="grid mt-16 mb-32">
          {data.map((item) => (
            <RadixTabs.Content
              key={item.title} value={item.title}
              className={classNames(
                "text-lg col-start-1 row-start-1 flex flex-col gap-5 justify-center transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0 z-10": activeItem === item.title },
                { "opacity-0 -right-24 z-0": activeItem !== item.title }
              )}
            >
              <GridBox columns={2} gap={0}>
                <div className="flex flex-col justify-center p-5 md:p-14 lg:pr-24 bg-lime-50 ">
                  {item.label && (
                    <p className="text-base uppercase tracking-widest">
                      {item.label}
                    </p>
                  )}
                  <h3 className="text-3xl font-bold mb-6">
                    {item.title}
                  </h3>
                  <p>{item.content}</p>
                  {item.link?.url && (
                    <div className="mt-6 flex justify-end">
                      <Button variant="outline" url={item.link?.url}>
                        {item.link?.text}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center lg:items-start lg:relative lg:top-10 lg:-left-10">
                  <Image
                    src={item.media?.src ?? ''}
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
    )
  }
  return <></>
}

export default TabPT