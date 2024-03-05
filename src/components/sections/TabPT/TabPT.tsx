"use client"
import React, { useEffect, useRef, useState } from 'react';
import classNames from "classnames";
import * as RadixTabs from '@radix-ui/react-tabs';
import { Section } from '@/components/elements/Section/Section';
import { Button } from '@/components/elements/Button/Button';
import { ContentPTType } from '@/helpers/types';
import { RichText2 } from "@/components/elements/RichText/RichText2"
import { FlexibleContentMediaPart } from '@/components/elements/FlexibleContentMediaPart/FlexibleContentMediaPart';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import "@/app/css/bg-color.css";
import "./styles.css"

export const TabPT: React.FC<{ data: ContentPTType }> = ({data}) => {
  const { htmlid, eyebrow, heading, summary, content, alignment, backgroundColor, backgroundImage } = data
  const [ activeItem, setActiveItem ] = React.useState(content.length > 0 ? content[0].id : '')
  
  // Justify tab container
  const [justify, setJustify] = useState("center")
  const wrapperRef = useRef(null) as unknown as React.MutableRefObject<HTMLDivElement>
  useEffect(() => {
    if (wrapperRef.current.scrollWidth > wrapperRef.current.clientWidth) {
      setJustify("start")
    }
  }, [])
  return (
    <Section
      id={htmlid}
      className={classNames(`${backgroundColor}-section-bg-color`)}
      eyebrow={eyebrow}
      heading={heading}
      summary={summary}
      framed={false}
      backgroundImage={backgroundImage}
    >
      <RadixTabs.Root
        className="w-full"
        defaultValue={content.length > 0 ? content[0].id : ""}
        onValueChange={(value) => setActiveItem(value)}
      >
        <div
          ref={wrapperRef}
          className={classNames(
            "flex overflow-x-auto whitespace-nowrap justify-start",
            [`justify-${justify}`]
          )}
        >
          <RadixTabs.List
            className={classNames("group/list tab-list p-2 inline-flex gap-x-2 gap-y-2 overflow-x-auto overscroll-contain")}
            aria-label={heading ? documentToHtmlString(heading) : undefined}
          >
            {content.length > 0 &&
              content.map((section) => (
                <RadixTabs.Trigger
                  key={section.id}
                  value={section.id}
                  className="group/trigger shrink-0 px-8 py-2.5 flex flex-col justify-center items-center cursor-pointer rounded-assets bg-neutral-100 hover:bg-primary-100 data-[state='active']:bg-primary-600 transition-colors duration-500 ease"
                >
                  <div
                    className={classNames(
                      "text-sm tracking-widest font-semibold text-neutral-500 group-hover/trigger:text-primary-500 group-data-[state='active']/trigger:text-primary-100 transition-colors duration-500 ease"
                    )}
                  >
                    {section.eyebrow}
                  </div>
                  {section.heading && (
                    <div className="block font-semibold text-lg lg:text-xl text-neutral-700 group-hover/trigger:text-primary-700 group-data-[state='active']/trigger:text-white transition-colors duration-500 ease">
                      <RichText2 data={section.heading} />
                    </div>
                  )}
                </RadixTabs.Trigger>
              ))}
          </RadixTabs.List>
        </div>
        <div className="mt-6 container px-4 mx-auto ">
          {content.map((section) => (
            <RadixTabs.Content
              key={section.id}
              value={section.id}
              className={classNames(
                "text-lg transition-all ease-in-out duration-500 relative ",
                { "opacity-100 right-0 z-10": activeItem === section.id },
                { "opacity-0 -right-24 z-0": activeItem !== section.id },
                { "text-center": alignment === "center" },
                { "text-end": alignment === "reverse" }
              )}
            >
              <div className="flex flex-col-reverse lg:flex-row lg:items-center rounded-assets p-4 lg:p-8 -mx-4 lg:-mx-8">
                <div className="py-4 lg:pr-10">
                  {section.description && (
                    <div className="prose 2xl:prose-lg">
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
                {(section.media.length > 0 || section.embeddedMediaUrl) && (
                  <div className="lg:w-1/2 shrink-0">
                    <FlexibleContentMediaPart data={section} alignment={alignment} />
                  </div>
                )}
              </div>
            </RadixTabs.Content>
          ))}
        </div>
      </RadixTabs.Root>
    </Section>
  )
}